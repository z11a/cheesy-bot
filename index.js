// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent       
    ] 
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
    console.log('Ready!');
});

/* test hi
client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    
    if (message.content == 'hi') {
        message.reply('i have no clothes on');
    }
})*/

// login to discord with token
client.login(process.env.TOKEN);
