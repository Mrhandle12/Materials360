const { spawn } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const env = { ...process.env, M360_NODE: process.execPath };
delete env.ELECTRON_RUN_AS_NODE;
if (process.argv.includes('--demo')) {
  env.M360_DATA_DIR = path.join(root, 'data-demo');
  env.M360_PORT = '3611';
  require('./seed-demo').seed(env.M360_DATA_DIR);
}
const child = spawn(require('electron'), [root], { cwd: root, env, stdio: 'inherit' });
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });
