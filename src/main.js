const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

let mainWindow;

// Hub configuration
const HUB_URL = process.env.HUB_URL || 'http://localhost:9003';
const HUB_API_KEY = process.env.HUB_API_KEY || 'lu_jon_QmZCAglY6kqsIdl6cRADpQ';

// Check if hub is reachable
async function checkHubHealth() {
  try {
    const response = await axios.get(`${HUB_URL}/health`, { timeout: 3000 });
    return response.status === 200;
  } catch (error) {
    console.error('Hub health check failed:', error.message);
    return false;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'ara-icon.png')
  });

  Menu.setApplicationMenu(null);

  mainWindow.loadFile(path.join(__dirname, '../index.html'));

  if (process.env.NODE_ENV === 'dev') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC handlers for Hub communication
ipcMain.handle('hub-request', async (event, { endpoint, method, data, params }) => {
  try {
    const config = {
      method,
      url: `${HUB_URL}${endpoint}`,
      headers: {
        'X-API-Key': HUB_API_KEY,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    };

    if (data) {
      config.data = data;
    }

    if (params) {
      config.params = params;
    }

    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.response?.status
    };
  }
});

ipcMain.handle('check-hub-health', async () => {
  return await checkHubHealth();
});

ipcMain.handle('get-hub-url', () => {
  return HUB_URL;
});

// App lifecycle
app.whenReady().then(async () => {
  // Check if hub is running before creating window
  const hubHealthy = await checkHubHealth();
  if (!hubHealthy) {
    console.warn(`Warning: Love-Unlimited Hub not reachable at ${HUB_URL}`);
    // Continue anyway - might be starting up
  }

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
