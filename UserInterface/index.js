const { app, BrowserWindow, ipcMain, nativeImage } = require("electron");
const { spawn, exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

function createWindow() {
  const iconImagePath = path.join(__dirname, "public", "app-icon.png");
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: iconImagePath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.platform === "darwin") {
    const iconImage = nativeImage.createFromPath(iconImagePath);
    app.dock.setIcon(iconImage);
  }

  mainWindow.loadFile(path.join(__dirname, "index.html"));
}

function startFlaskServer() {
  const serverPath = path.join(__dirname, "./scripts/order_input_api.exe");
  const serverProcess = spawn(serverPath, { detached: true, stdio: "ignore" });

  serverProcess.unref();
}

app.whenReady().then(() => {
  exec("webpack", (error, stdout, stderr) => {
    if (error) {
      console.error("Error running webpack:", error);
      return;
    }
    console.log("Webpack output:", stdout);
    startFlaskServer();
    createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("before-quit", () => {
  if (os.platform() === "win32") {
    exec("taskkill /f /im order_input_api.exe", (error, stdout, stderr) => {
      if (error) {
        console.error("Error while killing process:", error);
      }
    });
  } else {
    exec("pkill -f order_input_api", (error, stdout, stderr) => {
      if (error) {
        console.error("Error while killing process:", error);
      }
    });
  }
});

ipcMain.on("port-info", (event, port) => {
  mainWindow.webContents.send("port", port);
});
