# Mark Sumo Bot

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
</p>

<p align="center">
  A powerful and user-friendly WhatsApp multi-device bot built with Baileys
</p>

---

## Features

- Multi-device WhatsApp support
- Built with Baileys WhatsApp Web API
- PM2 process management for reliability
- Easy deployment to multiple platforms
- Session-based authentication
- Customizable commands and features
- MongoDB and PostgreSQL support
- AI integration capabilities (Google Generative AI)
- Media processing (images, videos, stickers)

---

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- A WhatsApp account for the bot
- (Optional) MongoDB or PostgreSQL database

---

## Getting Started

### 1. Get Your Session ID

Visit the Mark Sumo Bot session generator:

<a href='https://sessions.your-domain.com' target="_blank">
  <img alt='Get Session ID' src='https://img.shields.io/badge/Get%20Session%20ID-orange?style=for-the-badge&logo=whatsapp&logoColor=white'/>
</a>

Scan the QR code with your WhatsApp to generate a session ID.

### 2. Fork This Repository

Click the button below to fork this repository:

<a href="https://github.com/Santos1134/markwhatsappbot/fork">
  <img title="Mark Sumo Bot" src="https://img.shields.io/badge/FORK-Mark%20Sumo%20Bot?color=indigo&style=for-the-badge&logo=github">
</a>

### 3. Installation

Clone your forked repository:

```bash
git clone https://github.com/Santos1134/markwhatsappbot.git
cd markwhatsappbot
```

Install dependencies:

```bash
npm install
```

### 4. Configuration

Create a `.env` file in the root directory:

```env
SESSION_ID=your-session-id-here
PORT=8000
SESSION_NAME=auth_info_baileys
```

### 5. Running the Bot

Start the bot:
```bash
npm start
```

Stop the bot:
```bash
npm stop
```

Restart the bot:
```bash
npm restart
```

---

## Deployment Options

### 1. Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

1. Click the deploy button above
2. Enter your `SESSION_ID` in the environment variables
3. Click "Deploy App"

### 2. Mark Sumo Host (Custom Hosting)

<a href='https://host.your-domain.com' target="_blank">
  <img alt='Mark Sumo Host' src='https://img.shields.io/badge/-Mark%20Sumo%20Host%20Deploy-6971FF?style=for-the-badge&logo=server&logoColor=white'/>
</a>

Deploy with our custom hosting panel for managed deployment and easy configuration.

### 3. Railway

<a href='https://railway.app/new' target="_blank">
  <img alt='Railway' src='https://img.shields.io/badge/-Railway%20Deploy-FF8700?style=for-the-badge&logo=railway&logoColor=white'/>
</a>

1. Click the deploy button above
2. Connect your GitHub repository
3. Add `SESSION_ID` environment variable
4. Deploy

### 4. Render

<a href='https://dashboard.render.com/web/new' target="_blank">
  <img alt='Render' src='https://img.shields.io/badge/-Render%20Deploy-black?style=for-the-badge&logo=render&logoColor=white'/>
</a>

1. Click the deploy button above
2. Connect your repository
3. Add `SESSION_ID` environment variable
4. Deploy

### 5. Koyeb

<a href='https://app.koyeb.com/services/deploy' target="_blank">
  <img alt='Koyeb' src='https://img.shields.io/badge/-Koyeb%20Deploy-FF009D?style=for-the-badge&logo=koyeb&logoColor=white'/>
</a>

1. Click the deploy button
2. Connect repository
3. Add environment variables
4. Deploy

### 6. Replit

<a href='https://replit.com/~' target="_blank">
  <img alt='Replit' src='https://img.shields.io/badge/-Replit%20Deploy-1976D2?style=for-the-badge&logo=replit&logoColor=white'/>
</a>

---

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SESSION_ID` | WhatsApp session authentication ID | Yes | - |
| `PORT` | Server port | No | 8000 |
| `SESSION_NAME` | Session folder name | No | auth_info_baileys |

---

## Project Structure

```
mark-sumo-bot/
├── index.js              # Main bot entry point
├── config.js             # Configuration management
├── bot/                  # Bot feature modules
│   ├── commands/         # Command handlers
│   ├── events/           # Event listeners
│   └── utils/            # Utility functions
├── package.json          # Dependencies
├── app.json              # Platform deployment config
├── .env                  # Environment variables
└── README.md             # Documentation
```

---

## Tech Stack

- **Runtime:** Node.js with PM2
- **WhatsApp API:** @whiskeysockets/baileys (v6.7.19)
- **Web Framework:** Express.js
- **Databases:** MongoDB, PostgreSQL (with Sequelize ORM)
- **AI Integration:** Google Generative AI
- **Media Processing:** Puppeteer, JIMP, Sharp
- **Translation:** Google Translate API
- **Other:** Axios, node-cron, qrcode

---

## Commands

Commands will be documented as they are developed. The bot supports:
- Custom command handlers
- Event-driven architecture
- Plugin system for extensibility

---

## Development

This bot is under active development. Features are being added incrementally.

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## Support

For support and updates:

- GitHub Issues: [Report an issue](https://github.com/Santos1134/markwhatsappbot/issues)
- Email: your-email@example.com
- WhatsApp Channel: Coming soon

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Credits

**Created by Mark Sumo**

Built with Baileys WhatsApp Web API

---

## Disclaimer

This bot is for educational and personal use only. Use responsibly and in accordance with WhatsApp's Terms of Service. The developers are not responsible for any misuse of this software.

---

<p align="center">
  Made with ❤️ by Mark Sumo
</p>
