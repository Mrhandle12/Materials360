const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const { spawn } = require('node:child_process');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const dataDir = process.env.M360_DATA_DIR || path.join(root, 'data');
fs.mkdirSync(dataDir, { recursive: true });
app.setPath('userData', path.join(dataDir, 'desktop-profile'));
app.setName('Materials360');
const port = Number(process.env.M360_PORT || 3610);
const base = 'http://127.0.0.1:' + port;
const token = crypto.randomBytes(32).toString('hex');
let main, backend, ollama;
const log = text => fs.appendFileSync(path.join(dataDir, 'desktop.log'), new Date().toISOString() + ' ' + text + '\n');
async function ready(url, headers = {}, tries = 100) {
  for (let i = 0; i < tries; i++) {
    try { if ((await fetch(url, { headers, signal: AbortSignal.timeout(800) })).ok) return true; } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  return false;
}
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => { if (main) { main.restore(); main.focus(); } });
  app.whenReady().then(async () => {
    Menu.setApplicationMenu(null);
    const bundledNode = path.join(root, 'runtime', 'node.exe');
    const node = process.env.M360_NODE || (fs.existsSync(bundledNode) ? bundledNode : 'node');
    const env = { ...process.env, M360_DATA_DIR: dataDir, M360_PORT: String(port), M360_TOKEN: token };
    backend = spawn(node, [path.join(root, 'server-v2.js')], { cwd: root, env, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    backend.stdout.on('data', x => log(String(x).trim()));
    backend.stderr.on('data', x => log(String(x).trim()));
    backend.on('error', error => log(error.message));
    if (!await ready(base + '/api/health', { 'x-materials-token': token })) {
      dialog.showErrorBox('Materials360', 'Veri motoru başlatılamadı. Node.js 24+ kurulumunu ve data/desktop.log dosyasını kontrol edin.');
      return app.quit();
    }
    const aiEndpoint = process.env.M360_AI_ENDPOINT || 'http://127.0.0.1:11435';
    if (!await ready(aiEndpoint + '/api/tags', {}, 1)) {
      const candidates = [process.env.M360_OLLAMA, path.join(root, 'ai', 'ollama', 'ollama.exe'), process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Programs', 'Ollama', 'ollama.exe')].filter(Boolean);
      const executable = candidates.find(p => fs.existsSync(p)) || 'ollama';
      const aiEnv = { ...process.env, OLLAMA_HOST: new URL(aiEndpoint).host, OLLAMA_NO_CLOUD: '1', OLLAMA_NUM_PARALLEL: '1', OLLAMA_CONTEXT_LENGTH: '8192' };
      const bundledModels = path.join(root, 'ai', 'models');
      if (fs.existsSync(bundledModels)) aiEnv.OLLAMA_MODELS = bundledModels;
      ollama = spawn(executable, ['serve'], { cwd: root, env: aiEnv, windowsHide: true, stdio: 'ignore' });
      ollama.on('error', error => log('AI motoru bulunamadı: ' + error.message));
    }
    main = new BrowserWindow({ width: 1440, height: 980, minWidth: 1024, minHeight: 700, title: 'Materials360', icon: path.join(root, 'public', 'images', 'app-icon.png'), backgroundColor: '#f2f5f3', show: false, autoHideMenuBar: true, webPreferences: { preload: path.join(__dirname, 'preload.js'), nodeIntegration: false, contextIsolation: true, sandbox: true } });
    main.webContents.session.setPermissionRequestHandler((_wc, _permission, callback) => callback(false));
    main.webContents.session.webRequest.onBeforeSendHeaders({ urls: [base + '/*'] }, (details, callback) => callback({ requestHeaders: { ...details.requestHeaders, 'x-materials-token': token } }));
    main.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    main.webContents.on('will-navigate', (event, url) => { if (!url.startsWith(base + '/')) event.preventDefault(); });
    main.once('ready-to-show', () => { main.show(); log('Desktop window ready'); });
    main.webContents.on('render-process-gone', (_event, details) => log('Renderer exit ' + details.reason));
    ipcMain.handle('save-pdf', async event => {
      if (event.sender !== main.webContents) return false;
      const target = await dialog.showSaveDialog(main, { title: 'Teklifi PDF kaydet', defaultPath: path.join(app.getPath('documents'), 'Materials360-Teklif.pdf'), filters: [{ name: 'PDF', extensions: ['pdf'] }] });
      if (target.canceled) return false;
      fs.writeFileSync(target.filePath, await main.webContents.printToPDF({ printBackground: true, pageSize: 'A4', preferCSSPageSize: true }));
      return true;
    });
    await main.loadURL(base);
  }).catch(error => { log(error.stack || error.message); dialog.showErrorBox('Materials360', error.message); app.quit(); });
  app.on('window-all-closed', () => app.quit());
  app.on('before-quit', () => { backend?.kill(); ollama?.kill(); });
}
