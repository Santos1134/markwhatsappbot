/**
 * Mark Sumo Bot - WhatsApp Multi-Device Bot
 * Built with Baileys
 *
 * Author: Mark Sumo
 * License: MIT
 */

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const express = require('express');
const config = require('./config');

// Express server for deployment platforms
const app = express();
const PORT = config.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Mark Sumo Bot is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

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
            printQRInTerminal: !config.SESSION_ID, // Show QR if no session ID
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
                    startBot();
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

            // Extract message text
            const messageText = msg.message.conversation ||
                               msg.message.extendedTextMessage?.text ||
                               '';

            // Basic command handler
            if (messageText.startsWith('.')) {
                const command = messageText.slice(1).toLowerCase();

                // Test command
                if (command === 'alive' || command === 'ping') {
                    await sock.sendMessage(msg.key.remoteJid, {
                        text: '✓ Mark Sumo Bot is alive and running!'
                    }, { quoted: msg });
                }

                // Help command
                if (command === 'help' || command === 'menu') {
                    const helpText = `*Mark Sumo Bot Commands*\n\n` +
                                   `• .alive - Check if bot is running\n` +
                                   `• .ping - Check bot response\n` +
                                   `• .help - Show this menu\n\n` +
                                   `More commands coming soon!`;

                    await sock.sendMessage(msg.key.remoteJid, {
                        text: helpText
                    }, { quoted: msg });
                }
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
