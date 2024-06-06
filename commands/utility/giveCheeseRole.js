const { SlashCommandBuilder, GuildMember } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give_cheese_role')
        .setDescription('Gives cheese role')
        .addRoleOption(option =>
            option.setRequired(true)
                .setName('cheese')
                .setDescription('notifies u of cheese')
        ),
    async execute(interaction) {
        await interaction.reply(`${interaction.user.displayAvatarURL()} \nGave Cheese role.`)
    },
};