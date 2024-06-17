const { SlashCommandBuilder, GuildMember } = require("discord.js");
const getMenu = require("../../webscrape.js");

function displayFoods(foods) {
    return;
}

function displayMenu(menu, interaction) {
    //var finalString = `> # ${firstFoodSection.name}`;
    var finalString = "";
    for (const section of menu) {
        //console.log(section);
        finalString += `### ${section.name}\n`;
        for (const food of section.foods) {
            finalString += `* ${food.name}\n`;
        }
    }

    return finalString;  
}

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
        const menu = await getMenu(hallName, mealName);
        
        // check if menu is empty
        if (menu.length == 0) {
            await interaction.editReply({ content: `> *${hallName} is not currently serving ${mealName}*.`, ephemeral: true });
            return;
        }
        else {
            await interaction.editReply({ content: displayMenu(menu), ephemeral: true});
        }

        return;
    },
}