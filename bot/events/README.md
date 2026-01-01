# Events Directory

This directory contains event handlers for different WhatsApp events.

## Event Types

- `connection.js` - Connection events
- `messages.js` - Message events
- `groups.js` - Group events
- `calls.js` - Call events

## Structure

Each event handler should export functions for specific events:

```javascript
module.exports = {
    name: 'messages.upsert',
    execute: async (sock, update) => {
        // Event handling logic
    }
};
```
