process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';

const fs = require('fs');


const { app, BrowserWindow, dialog } = require('electron');

/** @type {BrowserWindow} */
let mainWindow = null;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  mainWindow.loadFile(`${__dirname}/index.html`)


  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })
})

exports.getFileFromUser = async () => {
  const files = await dialog.showOpenDialog({
    properties: ["openFile"],
    buttonLabel: 'Unveil',
    title: 'Open Fire Sale Document',
    filters: [
      {
        name: 'Text Files', extensions: ['txt', 'text'] },
      { name: 'Markdown Files', extensions: ['md'] }
    ]
  })

  if(!files.canceled) {
    const file = files.filePaths[0]
    openFile(file);    
  }
  
}




function openFile(file) {
  const content = fs.readFileSync(file).toString();
  mainWindow.webContents.send('file-opened', file, content)
}

