/**
 * Command Loader
 * Dynamically loads all commands from the commands directory
 */

const fs = require('fs');
const path = require('path');

class CommandLoader {
    constructor() {
        this.commands = new Map();
        this.aliases = new Map();
    }

    /**
     * Load all commands from commands directory
     */
    loadCommands() {
        const commandsDir = path.join(__dirname, '../commands');

        if (!fs.existsSync(commandsDir)) {
            console.log('Commands directory not found. Creating...');
            fs.mkdirSync(commandsDir, { recursive: true });
            return;
        }

        const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            try {
                const command = require(path.join(commandsDir, file));

                if (!command.name) {
                    console.warn(`Command file ${file} is missing 'name' property`);
                    continue;
                }

                this.commands.set(command.name, command);

                // Register aliases
                if (command.aliases && Array.isArray(command.aliases)) {
                    for (const alias of command.aliases) {
                        this.aliases.set(alias, command.name);
                    }
                }

                console.log(`✓ Loaded command: ${command.name}`);
            } catch (error) {
                console.error(`Error loading command ${file}:`, error);
            }
        }

        console.log(`\n✓ Loaded ${this.commands.size} commands\n`);
    }

    /**
     * Get command by name or alias
     * @param {string} name - Command name or alias
     * @returns {object|null} Command object
     */
    getCommand(name) {
        // Check if it's a direct command
        if (this.commands.has(name)) {
            return this.commands.get(name);
        }

        // Check if it's an alias
        if (this.aliases.has(name)) {
            const commandName = this.aliases.get(name);
            return this.commands.get(commandName);
        }

        return null;
    }

    /**
     * Get all commands
     * @returns {Map} All commands
     */
    getAllCommands() {
        return this.commands;
    }

    /**
     * Get commands by category
     * @param {string} category
     * @returns {Array} Commands in category
     */
    getCommandsByCategory(category) {
        const commands = [];
        for (const [name, command] of this.commands.entries()) {
            if (command.category === category) {
                commands.push(command);
            }
        }
        return commands;
    }
}

// Export singleton instance
module.exports = new CommandLoader();
