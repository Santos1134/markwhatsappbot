/**
 * Info Command
 * Display bot information
 */

const os = require('os');

module.exports = {
    name: 'info',
    aliases: ['about', 'botinfo'],
    category: 'general',
    description: 'Display bot information and stats',
    usage: '.info',

    async execute(sock, msg, args) {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const infoMessage = `╭━━━『 *MARK SUMO BOT INFO* 』━━━╮\n\n` +
                          `🤖 *Bot Name:* Mark Sumo Bot\n` +
                          `👨‍💻 *Developer:* Mark Sumo\n` +
                          `📦 *Version:* 1.0.0\n` +
                          `⚙️ *Platform:* Baileys Multi-Device\n\n` +
                          `💻 *System Info:*\n` +
                          `  • OS: ${os.platform()}\n` +
                          `  • RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}GB\n` +
                          `  • Uptime: ${hours}h ${minutes}m ${seconds}s\n\n` +
                          `📊 *Features:*\n` +
                          `  • Command Handler\n` +
                          `  • Media Downloads\n` +
                          `  • AI Integration\n` +
                          `  • Sticker Maker\n` +
                          `  • And more!\n\n` +
                          `🔗 *GitHub:* github.com/Santos1134/markwhatsappbot\n\n` +
                          `╰━━━━━━━━━━━━━━━━━━╯`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: infoMessage
        }, { quoted: msg });
    }
};
