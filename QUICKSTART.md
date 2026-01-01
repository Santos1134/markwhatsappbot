# Mark Sumo Bot - Quick Start Guide

Complete guide to get your WhatsApp bot running in minutes!

## Option 1: Quick Test (QR in Terminal - EASIEST)

This is the fastest way to test your bot without needing the session service.

```bash
cd C:\Users\sumom\PRINCE-MDXI

# Install dependencies (if not done)
npm install

# Run the bot
npm start
```

**What happens:**
1. Bot starts and shows QR code in terminal
2. Open WhatsApp on your phone
3. Go to Settings → Linked Devices → Link a Device
4. Scan the QR code from your terminal
5. Bot connects!

**Test commands:**
- Send `.menu` - See all commands
- Send `.alive` - Check bot status
- Send `.info` - Bot information

---

## Option 2: With Session Service (Professional)

Use your custom session generator website.

### Step 1: Start Session Service

**Terminal 1 - Backend:**
```bash
cd C:\Users\sumom\mark-sumo-session\backend
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║  Mark Sumo Session Service Started     ║
║  Port: 5000                            ║
╚════════════════════════════════════════╝
```

**Terminal 2 - Frontend:**
```bash
cd C:\Users\sumom\mark-sumo-session\frontend
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000
```

### Step 2: Generate Session ID

1. Open http://localhost:3000/generate
2. Choose method:
   - **QR Code**: Click "Use QR Code" → Scan with WhatsApp
   - **Pairing Code**: Enter phone (with country code like 2347012345678) → Enter code in WhatsApp
3. Copy the Session ID

### Step 3: Run Bot with Session ID

```bash
cd C:\Users\sumom\PRINCE-MDXI

# Create .env file
copy .env.example .env

# Edit .env and paste your SESSION_ID
notepad .env
```

In `.env`, add:
```
SESSION_ID=your-session-id-here
```

Then run:
```bash
npm start
```

---

## Available Commands

Your bot currently has:

| Command | Aliases | Description |
|---------|---------|-------------|
| `.menu` | `.help`, `.commands` | Show all commands |
| `.alive` | `.ping`, `.test` | Check bot status |
| `.info` | `.about`, `.botinfo` | Bot information |

---

## Troubleshooting

### Session Service Won't Start

**Problem:** Backend crashes or won't start

**Solution:**
```bash
cd C:\Users\sumom\mark-sumo-session\backend

# Make sure .env exists
copy .env.example .env

# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run dev
```

### Bot Won't Connect

**Problem:** Bot shows error when starting

**Solutions:**
1. **No SESSION_ID in .env** → Just run `npm start` and scan QR in terminal
2. **Invalid SESSION_ID** → Generate a new one
3. **Old session** → Delete `auth_info_baileys` folder and try again

### Commands Not Working

**Problem:** Bot doesn't respond to commands

**Check:**
1. Is bot showing "✓ Mark Sumo Bot connected successfully!"?
2. Are you using the right prefix? (Default: `.`)
3. Try `.menu` to see if bot is responding

---

## Deployment (Production)

### Deploy Bot to Heroku

```bash
# In your bot directory
cd C:\Users\sumom\PRINCE-MDXI

# Login to Heroku
heroku login

# Create app
heroku create mark-sumo-bot

# Set SESSION_ID
heroku config:set SESSION_ID="your-session-id"

# Deploy
git push heroku main
```

### Deploy Session Service

**Backend (Railway):**
1. Visit https://railway.app
2. New Project → Deploy from GitHub
3. Select: `Santos1134/mark-sumo-session`
4. Root directory: `/backend`
5. Add environment variable: `FRONTEND_URL=your-frontend-url`

**Frontend (Vercel):**
1. Visit https://vercel.com
2. Import Git Repository → `Santos1134/mark-sumo-session`
3. Root directory: `/frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL=your-backend-url`

---

## Next Steps

1. ✅ Test bot with Option 1 (QR in terminal)
2. ✅ Test session service with Option 2
3. 🔧 Add more commands (media downloads, stickers, AI)
4. 🚀 Deploy to production
5. 📱 Share with users!

---

## Support

- Bot Repo: https://github.com/Santos1134/markwhatsappbot
- Session Service: https://github.com/Santos1134/mark-sumo-session
- Issues: Open an issue on GitHub

---

**Ready to test?** Start with Option 1 - it's the fastest way to see your bot in action!
