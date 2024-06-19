const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const getMenu = require("../../webscrape.js");

/*function displayMenu(menu, interaction) {
    var finalString = "";
    for (const section of menu) {
        //console.log(section);
        finalString += `### ${section.name}\n`;
        for (const food of section.foods) {
            finalString += `* ${food.name}\n`;
        }
    }

    return finalString;  
}*/

function returnFoodNames(section) {
    var finalFoodNames = '';

    for (const food of section.foods) {
        finalFoodNames += `${food.name}\n`;
    }

    return finalFoodNames;
}

function createEmbedMenuFields(menu) {
    var finalFields = [];

    for (const section of menu) {
        finalFields.push({ name: `${section.name}`, value: `${returnFoodNames(section)}`, inline: true });
    }
    

    return finalFields;
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
            // create embed message
            const embedMenu = {
                color: 0x0099ff,
                title: `${mealName} at ${hallName}`,
                url: 'https://dineoncampus.com/northwestern/whats-on-the-menu',
                author: {
                    name: 'Aidan and Rebecca! :3',
                    icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqn-ZjtZuIbBCzawJetckI3U2YvWcFz48-bw&s',
                },
                description: 'you must be a hungry little boy',
                thumbnail: {
                    url: 'https://play-lh.googleusercontent.com/VMp8mdDuut-gkP7Yfx_rnF5ikUsFp71sWS6SOKcHa960YqWrjuMLqJXJyYTjr-c3i2M',
                },
                fields: createEmbedMenuFields(menu),
                timestamp: new Date().toISOString(),
            };

            await interaction.editReply({ embeds: [embedMenu], ephemeral: true});
        }

        return;
    },
}