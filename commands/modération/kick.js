module.exports = {
    name: 'exemple',
    aliases: ['alias1', 'alias2'],
    description: 'Ceci est un exemple de commande.',
    permissions: 'KICK_MEMBERS',
    ownerOnly: false,
    dmOnly: false,
    serverOnly: true,
    cooldown: 5,
    execute: async (client, message, args) => {
        // Votre code ici
    },
};
