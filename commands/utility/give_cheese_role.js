const { SlashCommandBuilder, GuildMember } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give_cheese_role')
        .setDescription('Gives cheese role'),      
    async execute(interaction) {
        let mapOfRoles = interaction.member.roles.valueOf()

        if (mapOfRoles.get('1235668350869176351') == undefined) {
            try {
                interaction.member.roles.add('1235668350869176351');
                interaction.reply('Gave you the role!')
            } catch (error) {
                console.log(error);
            }
        }
        else {
            await interaction.reply('You already have the role!')
        }

        return;
    },
}