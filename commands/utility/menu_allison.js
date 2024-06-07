const { SlashCommandBuilder, GuildMember } = require("discord.js");
const { getMenu } = require("./webscrape.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu_allison')
        .setDescription("Return Allison dining hall's breakfast menu."),      
    async execute(interaction) {
        getMenu("Allison Dining Hall");
        return;
    },
}