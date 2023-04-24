const { readdirSync } = require('fs');
const path = require('path');

module.exports = async (client) => {
    const commandFolders = readdirSync('./commands');

    for (const folder of commandFolders) {
        const commandFiles = readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.name, command);
            if (command.aliases) {
                command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
            }
        }
    }
};
