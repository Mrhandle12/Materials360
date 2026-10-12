const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktop', {
  isDesktop: true,
  savePDF: () => ipcRenderer.invoke('save-pdf')
});
