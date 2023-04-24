const { MessageEmbed } = require('discord.js');
const { getPrefix } = require('../utils/prefixManager');

const { checkCooldown, checkPermissions, checkOwnerOnly, checkDMOnly, checkServerOnly, checkDisabled } = require('../utils/commandChecks');

module.exports = {
    name: 'messageCreate',
    execute: async (client, message) => {
        if (message.author.bot || !message.guild) return;

        const prefix = await getPrefix(message.guild.id);
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

        if (!command) return;

        if (
            checkDisabled(command) ||
            !checkPermissions(command, message) ||
            !checkOwnerOnly(command, message) ||
            !checkDMOnly(command, message) ||
            !checkServerOnly(command, message) ||
            !checkCooldown(command, message)
        ) return;


        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error('Error executing command:', error);
            message.reply('Une erreur s\'est produite lors de l\'exécution de la commande.');
        }
    },
};
