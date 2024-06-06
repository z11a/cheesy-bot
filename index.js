import('./config.json')

const { Client, Events, GatewayIntentBits, messageLink } = import('discord.js');

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
client.login(process.env.TOKEN);
