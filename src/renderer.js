// AraOS Client - Chat interface for Love-Unlimited Hub

let currentNamespace = 'shared-work';
let chatHistory = [];

// DOM Elements
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const namespaceSelect = document.getElementById('namespace-select');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const thinkBtn = document.getElementById('think-btn');
const chatMessages = document.getElementById('chat-messages');
const hubUrlInput = document.getElementById('hub-url');
const notificationEl = document.getElementById('notification');

// Initialize
async function init() {
  // Get and display hub URL
  const hubUrl = await window.araos.getHubUrl();
  hubUrlInput.value = hubUrl;

  // Check hub health
  await checkHubHealth();

  // Set up event listeners
  namespaceSelect.addEventListener('change', (e) => {
    currentNamespace = e.target.value;
    addSystemMessage(`Switched to namespace: ${currentNamespace}`);
  });

  sendBtn.addEventListener('click', contributeMemory);
  thinkBtn.addEventListener('click', askSuperBrain);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') contributeMemory();
  });

  // Monitor hub health every 5 seconds
  setInterval(checkHubHealth, 5000);
}

// Check hub health
async function checkHubHealth() {
  try {
    const isHealthy = await window.araos.checkHealth();
    if (isHealthy) {
      setStatus('online', 'Connected');
      if (chatMessages.textContent.includes('Connecting')) {
        chatMessages.innerHTML = '';
        addSystemMessage('Connected to Love-Unlimited Hub 💙');
      }
    } else {
      setStatus('offline', 'Disconnected');
    }
  } catch (error) {
    setStatus('offline', 'Error');
    console.error('Health check failed:', error);
  }
}

// Set status indicator
function setStatus(status, text) {
  statusDot.className = `status-dot ${status}`;
  statusText.textContent = text;
}

// Add message to chat
function addMessage(text, type = 'hub') {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${type}`;
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  chatHistory.push({ text, type, timestamp: new Date().toISOString() });
}

// Add system message
function addSystemMessage(text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message system';
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show notification
function showNotification(message, type = 'info') {
  notificationEl.textContent = message;
  notificationEl.className = `notification show ${type}`;
  setTimeout(() => {
    notificationEl.classList.remove('show');
  }, 4000);
}

// Contribute a memory
async function contributeMemory() {
  const text = messageInput.value.trim();
  if (!text) {
    showNotification('Please enter a memory', 'error');
    return;
  }

  addMessage(text, 'user');
  messageInput.value = '';
  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending...';

  try {
    const response = await window.araos.contribute(text, currentNamespace);
    if (response.success) {
      addMessage('✓ Memory contributed to the Super Brain', 'hub');
      showNotification('Memory saved!', 'success');
    } else {
      addMessage(`Error: ${response.error}`, 'hub');
      showNotification(`Error: ${response.error}`, 'error');
    }
  } catch (error) {
    addMessage(`Error: ${error.message}`, 'hub');
    showNotification(`Error: ${error.message}`, 'error');
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send';
  }
}

// Ask Super Brain
async function askSuperBrain() {
  const prompt = messageInput.value.trim();
  if (!prompt) {
    showNotification('Please enter a prompt', 'error');
    return;
  }

  addMessage(prompt, 'user');
  messageInput.value = '';
  thinkBtn.disabled = true;
  thinkBtn.textContent = 'Thinking...';

  try {
    const response = await window.araos.think(prompt, currentNamespace);
    if (response.success) {
      const synthesis = response.data.synthesis || response.data.response || 'No response';
      addMessage(`Super Brain: ${synthesis}`, 'hub');
      showNotification('Synthesis complete!', 'success');
    } else {
      addMessage(`Error: ${response.error}`, 'hub');
      showNotification(`Error: ${response.error}`, 'error');
    }
  } catch (error) {
    addMessage(`Error: ${error.message}`, 'hub');
    showNotification(`Error: ${error.message}`, 'error');
  } finally {
    thinkBtn.disabled = false;
    thinkBtn.textContent = 'Think';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init); 