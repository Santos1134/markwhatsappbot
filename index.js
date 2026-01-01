/**
 * Mark Sumo Bot - WhatsApp Multi-Device Bot
 * Built with Baileys
 *
 * Author: Mark Sumo
 * License: MIT
 */

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, delay } = require('@whiskeysockets/baileys');
const pino = require('pino');
const express = require('express');
const config = require('./config');
const commandLoader = require('./bot/utils/commandLoader');

// Load all commands
console.log('Loading commands...');
commandLoader.loadCommands();

// Express server for deployment platforms
const app = express();
const PORT = config.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Mark Sumo Bot is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Prefix
const PREFIX = config.PREFIX || '.';

// Main bot function
async function startBot() {
    console.log('Starting Mark Sumo Bot...');

    try {
        // Load authentication state
        const { state, saveCreds } = await useMultiFileAuthState(config.SESSION_NAME);

        // Get latest Baileys version
        const { version } = await fetchLatestBaileysVersion();

        // Create WhatsApp socket connection
        const sock = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: !config.SESSION_ID,
            auth: state,
            browser: ['Mark Sumo Bot', 'Chrome', '1.0.0']
        });

        // Save credentials on update
        sock.ev.on('creds.update', saveCreds);

        // Connection update handler
        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;

            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('Connection closed due to:', lastDisconnect?.error);

                if (shouldReconnect) {
                    console.log('Reconnecting...');
                    setTimeout(startBot, 5000);
                } else {
                    console.log('Logged out. Please scan QR code again.');
                }
            } else if (connection === 'open') {
                console.log('✓ Mark Sumo Bot connected successfully!');
            }
        });

        // Message handler
        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type !== 'notify') return;

            const msg = messages[0];
            if (!msg.message) return;

            // Ignore messages from bot itself
            if (msg.key.fromMe) return;

            // Extract message text
            const messageText = msg.message.conversation ||
                               msg.message.extendedTextMessage?.text ||
                               msg.message.imageMessage?.caption ||
                               msg.message.videoMessage?.caption ||
                               '';

            // Check if message starts with prefix
            if (!messageText.startsWith(PREFIX)) return;

            // Parse command and args
            const args = messageText.slice(PREFIX.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            // Get command
            const command = commandLoader.getCommand(commandName);

            if (!command) return;

            // Execute command
            try {
                console.log(`Executing command: ${command.name} from ${msg.key.remoteJid}`);

                await command.execute(sock, msg, args, {
                    commandLoader,
                    config,
                    PREFIX
                });
            } catch (error) {
                console.error(`Error executing command ${command.name}:`, error);

                await sock.sendMessage(msg.key.remoteJid, {
                    text: `❌ Error executing command: ${error.message}`
                }, { quoted: msg });
            }
        });

        // Handle group updates
        sock.ev.on('group-participants.update', async (update) => {
            console.log('Group participants update:', update);
            // Add welcome/goodbye messages here
        });

    } catch (error) {
        console.error('Error starting bot:', error);
        setTimeout(startBot, 5000); // Retry after 5 seconds
    }
}

// Start the bot
startBot();

// Handle process termination
process.on('SIGINT', () => {
    console.log('\nShutting down Mark Sumo Bot...');
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});
