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
      { name: 'Markdown Files', extensions: ['md'] },
      { name: 'Text Files', extensions: ['txt', 'text'] }
    ]
  })
  
  if(!files.canceled) {
    const file = files.filePaths[0]
    openFile(file);    
  }
  
}

exports.saveMarkdown = async (file, content) => {
  if(!file) {
    const actionResult = await dialog.showSaveDialog({
      title: 'Save Markdown',
      defaultPath: app.getPath('desktop'),
      filters: [
        { name: 'Text Files', extensions: ['txt', 'text'] }
      ]
    })

    if(actionResult.canceled) return

    file = actionResult.filePath
  }

  if(!file) return

  fs.writeFileSync(file, content);
  openFile(file);
}

exports.saveHTML = async (content) => {
  const actionResult = await dialog.showSaveDialog({
    title: 'Save HTML',
    defaultPath: app.getPath('documents'),
    filters: [
      {name: 'HTML Files', extensions: ['html', 'htm']}
    ]
  })

  if(actionResult.canceled) return

  const file = actionResult.filePath

  if(!file) return


  fs.writeFileSync(file, content);
}


const openFile = exports.openFile = (file) => {
  const content = fs.readFileSync(file).toString();
  app.addRecentDocument(file)
  mainWindow.webContents.send('file-opened', file, content)
}

