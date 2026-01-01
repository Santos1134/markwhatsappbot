/**
 * Alive Command
 * Check if bot is running
 */

module.exports = {
    name: 'alive',
    aliases: ['ping', 'test'],
    category: 'general',
    description: 'Check if bot is alive and responding',
    usage: '.alive',

    async execute(sock, msg, args) {
        const start = Date.now();

        const aliveMessage = `╭━━━『 *BOT STATUS* 』━━━╮\n\n` +
                           `✅ *Status:* Online\n` +
                           `🤖 *Bot:* Mark Sumo Bot\n` +
                           `⚡ *Speed:* Calculating...\n` +
                           `📅 *Date:* ${new Date().toLocaleDateString()}\n` +
                           `🕐 *Time:* ${new Date().toLocaleTimeString()}\n\n` +
                           `╰━━━━━━━━━━━━━━━━━━╯`;

        const sentMsg = await sock.sendMessage(msg.key.remoteJid, {
            text: aliveMessage
        }, { quoted: msg });

        // Update with ping time
        const end = Date.now();
        const ping = end - start;

        const updatedMessage = `╭━━━『 *BOT STATUS* 』━━━╮\n\n` +
                              `✅ *Status:* Online\n` +
                              `🤖 *Bot:* Mark Sumo Bot\n` +
                              `⚡ *Speed:* ${ping}ms\n` +
                              `📅 *Date:* ${new Date().toLocaleDateString()}\n` +
                              `🕐 *Time:* ${new Date().toLocaleTimeString()}\n\n` +
                              `╰━━━━━━━━━━━━━━━━━━╯`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: updatedMessage,
            edit: sentMsg.key
        });
    }
};
