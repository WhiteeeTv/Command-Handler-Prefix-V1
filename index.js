
const Discord = require('discord.js');


const { Client, Intents } = require("discord.js");
const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents });


const { Collection } = require('discord.js');
const { token } = require('./config.json');
const { loadCommands, loadEvents } = require('./utils/loaders');



client.commands = new Collection();
client.aliases = new Collection();
client.prefixes = new Collection();

(async () => {
    await loadCommands(client);
    await loadEvents(client);
    await client.login(token);
})();




process.on('uncaughtException', (error) => {
    console.error('Erreur non gérée :', error);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesse non gérée rejetée :', promise, 'Raison :', reason);
});
process.on('SIGINT', async () => {
    console.log('Fermeture de la connexion MongoDB...');
    await client.mongoClient.close();
    process.exit();
});