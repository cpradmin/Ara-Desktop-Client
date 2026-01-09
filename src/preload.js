const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('araos', {
  // Make requests to the Love-Unlimited Hub
  request: async (endpoint, method = 'GET', data = null) => {
    return ipcRenderer.invoke('hub-request', { endpoint, method, data });
  },

  // Check if hub is healthy
  checkHealth: async () => {
    return ipcRenderer.invoke('check-hub-health');
  },

  // Get hub URL
  getHubUrl: async () => {
    return ipcRenderer.invoke('get-hub-url');
  },

  // Recall memories from hub
  recall: async (options = {}) => {
    return ipcRenderer.invoke('hub-request', {
      endpoint: '/recall',
      method: 'GET',
      params: options
    });
  },

  // Contribute a memory to the Super Brain
  contribute: async (memory, namespace = 'shared-work') => {
    return ipcRenderer.invoke('hub-request', {
      endpoint: '/super_brain/contribute',
      method: 'POST',
      data: { content: memory, namespace, timestamp: new Date().toISOString() }
    });
  },

  // Ask the Super Brain
  think: async (prompt, namespace = 'shared-work') => {
    return ipcRenderer.invoke('hub-request', {
      endpoint: '/super_brain/think',
      method: 'POST',
      data: { prompt, namespace, timestamp: new Date().toISOString() }
    });
  }
}); 