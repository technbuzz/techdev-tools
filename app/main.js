process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';


const { app, BrowserWindow } = require('electron');

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


