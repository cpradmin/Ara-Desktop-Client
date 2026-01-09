# AraOS Client 💙

**Thin Client for Love-Unlimited Hub - Chat interface to the Super Brain**

AraOS Client is a lightweight Electron desktop application that connects to the **ara-os-desktop** (Love-Unlimited Hub), providing a clean chat interface to contribute memories and ask the Super Brain questions.

## Architecture

```
┌─────────────────────────────────────────┐
│    AraOS Client (This App)              │
│  • Thin chat interface                  │
│  • Communicates with Love-Unlimited Hub │
│  • No local data storage                │
│  • Clean, minimal UI                    │
└─────────────────────────────────────────┘
              ↓ (REST API)
┌─────────────────────────────────────────┐
│    ara-os-desktop (Hub/OS)              │
│  • Sovereign Love-Unlimited Hub         │
│  • Runs at localhost:9003               │
│  • All memories, caching, synthesis     │
│  • Backend infrastructure               │
└─────────────────────────────────────────┘
```

## Features

✨ **Client Interface**
- Clean chat interface for Super Brain communication
- Namespace selector (jon, shared-work, shared-friendship)
- Real-time hub health monitoring
- Status indicator (Connected/Disconnected)
- Deep indigo + love pink theme

🧠 **Super Brain Integration**
- Contribute memories to the hub
- Ask the Super Brain questions
- Receive synthesized responses
- Multi-namespace support

⚙️ **Connection Management**
- Auto-detects Love-Unlimited Hub
- Configurable via environment variables
- Health checks every 5 seconds
- Graceful error handling

---

## Installation

### Prerequisites

- Node.js 16+ and npm
- **ara-os-desktop** running at `http://localhost:9003` (Love-Unlimited Hub)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cpradmin/Ara-Desktop-Client.git
   cd Ara-Desktop-Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment (optional):**
   ```bash
   cp .env.example .env
   # Edit .env if your hub is on a different host/port
   ```

4. **Run in development:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## Usage

1. **Start ara-os-desktop** (the Love-Unlimited Hub):
   ```bash
   cd ~/ai-dream-team/micro-ai-swarm/ara-os-desktop
   npm run dev
   ```

2. **Start AraOS Client** (this app):
   ```bash
   npm run dev
   ```

3. **Use the interface:**
   - Select a namespace (Personal, Team, Family)
   - Type a memory or question
   - Click **Send** to contribute a memory
   - Click **Think** to ask the Super Brain
   - View responses in the chat window

---

## Configuration

### Environment Variables

Create a `.env` file:

```env
HUB_URL=http://localhost:9003
HUB_API_KEY=lu_jon_QmZCAglY6kqsIdl6cRADpQ
NODE_ENV=production
```

### Hub URL

The hub URL is displayed in the toolbar for reference. The client will automatically detect and connect to the hub.

---

## API Integration

AraOS Client communicates with ara-os-desktop via these endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check hub availability |
| `/super_brain/contribute` | POST | Submit a memory |
| `/super_brain/think` | POST | Ask Super Brain a question |

All requests include the `X-API-Key` header for authentication.

---

## Project Structure

```
Ara-Desktop-Client/
├── src/
│   ├── main.js              # Electron main process
│   ├── preload.js           # Context bridge (secure IPC)
│   └── renderer.js          # Chat UI logic
├── index.html               # Main window
├── styles.css               # Deep indigo + love pink theme
├── package.json             # Dependencies
├── .env.example             # Configuration template
└── README.md                # This file
```

---

## Development

### Running in Development Mode

```bash
npm run dev
```

Opens DevTools automatically for debugging.

### Build for All Platforms

```bash
npm run build-all
```

Generates installers for Windows and Linux.

---

## Security

- **Context Isolation**: Enabled for secure renderer process
- **IPC Security**: Whitelisted channels only
- **API Keys**: Stored in .env, never exposed
- **No Node Integration**: Renderer can't access Node.js APIs

---

## Troubleshooting

### "Cannot connect to hub"
- Ensure ara-os-desktop is running at `http://localhost:9003`
- Check `HUB_URL` in `.env`
- Check `HUB_API_KEY` is correct

### "Disconnected from hub"
- Verify ara-os-desktop is still running
- Check network connectivity
- Restart the client app

### "Hub URL shows wrong address"
- Edit `.env` with correct `HUB_URL`
- Restart the client

---

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a PR

---

## License

MIT — See LICENSE file

---

## Philosophy & Vision

AraOS Client is part of the **Love Unlimited** ecosystem:

- **Thin Client**: Minimal, focused UI
- **Hub-Centric**: All data lives in ara-os-desktop
- **Sovereign**: You own the hub, the data, everything
- **Family**: Connect with your team and loved ones
- **Always-Connected**: Real-time communication with Super Brain

*"Love unlimited. Until next time. 💙"*

---

## Support

For issues, questions, or ideas:
- [GitHub Issues](https://github.com/cpradmin/Ara-Desktop-Client/issues)
- [Documentation](https://github.com/cpradmin/Ara-Desktop-Client/wiki)

---

**Made with 💙 as a client to the Super Brain.**
