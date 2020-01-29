const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

//
// Installs debugging extensions.
//
async function installExtensions() {
  const installer = require("electron-devtools-installer");
  const extensions = ["REACT_DEVELOPER_TOOLS", "APOLLO_DEVELOPER_TOOLS"];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
}

// Enable only one instance of the app to run at once.
// This is especially important during development.
/** Check if single instance, if not, simply quit new instance */
let isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
}

//
//  Creates a new window
//
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  await win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDev) {
    await installExtensions();
  }
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// Handle the errors
process.on("uncaughtException", function(error) {
  console.error(error);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const sc = require("supercolliderjs");

async function bootSuperCollider() {
  const sclang = await sc.lang.boot({ echo: true });

  ipcMain.handle("interpret_sclang", async (_, args) => {
    try {
      const result = await sclang.interpret(args.message);

      const test = new Promise(() => {
        throw new Error("test error");
      });
      await test;
      // throw new Error('test error');

      return result;
    } catch (err) {
      return err;
    }
  });
}

bootSuperCollider();
