// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

app.on('ready', ready)
app.on('window-all-closed', closeWindow)
app.on('activate', activate)

function ready() {
  // Create the browser window.
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  appWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/dist/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  appWindow.webContents.openDevTools();
}

function activate() {
  if (win === null)
    initWindow();
}

function closeWindow() {
  if (process.platform !== 'darwin')
    app.quit()

  process.exit(0);
}
