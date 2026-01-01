# Commands Directory

This directory contains all bot command handlers.

## Structure

Each command should be a separate file that exports a command object:

```javascript
module.exports = {
    name: 'commandname',
    aliases: ['alias1', 'alias2'],
    category: 'general',
    description: 'Command description',
    usage: '.commandname <args>',
    execute: async (sock, msg, args) => {
        // Command logic here
    }
};
```

## Categories

- `general` - General purpose commands
- `media` - Media download/manipulation commands
- `group` - Group management commands
- `owner` - Owner-only commands
- `fun` - Entertainment commands
- `utility` - Utility commands
