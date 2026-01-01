/**
 * Menu/Help Command
 * Shows all available commands
 */

module.exports = {
    name: 'menu',
    aliases: ['help', 'commands'],
    category: 'general',
    description: 'Display all available commands',
    usage: '.menu',

    async execute(sock, msg, args, { commandLoader, config }) {
        const commands = commandLoader.getAllCommands();

        // Group commands by category
        const categories = {};
        for (const [name, command] of commands.entries()) {
            const category = command.category || 'other';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(command);
        }

        // Build menu text
        let menuText = `╭━━━『 *MARK SUMO BOT* 』━━━╮\n\n`;
        menuText += `👋 Hello! I'm Mark Sumo Bot\n`;
        menuText += `🤖 Prefix: ${config.PREFIX || '.'}\n`;
        menuText += `📦 Total Commands: ${commands.size}\n\n`;

        // Add commands by category
        const categoryEmojis = {
            general: '📌',
            media: '📥',
            fun: '🎮',
            utility: '🔧',
            ai: '🤖',
            owner: '👑'
        };

        for (const [category, cmds] of Object.entries(categories)) {
            const emoji = categoryEmojis[category] || '📂';
            menuText += `${emoji} *${category.toUpperCase()}*\n`;

            for (const cmd of cmds) {
                menuText += `  • ${config.PREFIX}${cmd.name}`;
                if (cmd.aliases && cmd.aliases.length > 0) {
                    menuText += ` (${cmd.aliases.join(', ')})`;
                }
                menuText += `\n`;
            }
            menuText += `\n`;
        }

        menuText += `╰━━━━━━━━━━━━━━━━━━╯\n\n`;
        menuText += `📝 Use ${config.PREFIX}menu <command> for details\n`;
        menuText += `💡 Example: ${config.PREFIX}menu alive\n\n`;
        menuText += `🔗 Bot by Mark Sumo`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: menuText
        }, { quoted: msg });
    }
};
