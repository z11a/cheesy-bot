const { Client, Events, GatewayIntentBits, messageLink } = require('discord.js');
const { TOKEN } = require('./config.json');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] });

// run once to check
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
client.login(TOKEN);
