const { SlashCommandBuilder, GuildMember } = require("discord.js");
const getMenu = require("../../webscrape.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription("Return the menu of specified dining hall.")
        .addStringOption(option =>
            option.setName('name')
                .setDescription('name of dining hall')
                .setRequired(true)
                .addChoices(
                    { name: 'Allison', value: 'Allison Dining Commons'},
                    { name: 'Sargent', value: 'Sargent Dining Commons'},
                    { name: 'Plex West', value: 'Foster Walker Plex West'},
                    { name: 'Plex East', value: 'Fostet Walker Plex West'},
                    { name: 'Elder', value: 'Elder Dining Commons'}
                )
        )
        .addStringOption(option =>
            option.setName('meal')
                .setDescription('menu of which meal')
                .setRequired(true)
                .addChoices(
                    { name: 'Breakfast', value: 'Breakfast'},
                    { name: 'Lunch', value: 'Lunch'},
                    { name: 'Dinner', value: 'Dinner'}
                )
        ),      
    async execute(interaction) {
        console.log('menu command executed...');
        const hallName = interaction.options.getString('name');
        const mealName = interaction.options.getString('meal');
        
        await interaction.deferReply();  
        const finalMenu = await getMenu(hallName, mealName);
        
        // check if menu is empty
        if (finalMenu.length == 0) {
            await interaction.editReply({ content: `> *${hallName} is not currently serving ${mealName}*.`, ephemeral: true });
            return;
        }
        else {
            await interaction.editReply({ content: `> *return the menu all fancy*`, ephemeral: true });
        }

        return;
    },
}