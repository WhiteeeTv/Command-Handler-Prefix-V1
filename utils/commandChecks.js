const cooldowns = new Map();

const checkCooldown = (command, message) => {
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Map());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            message.reply(`Veuillez patienter ${timeLeft.toFixed(1)} seconde(s) avant de réutiliser la commande \`${command.name}\`.`);
            return false;
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    return true;
};

const checkPermissions = (command, message) => {
    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            message.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
            return false;
        }
    }

    return true;
};

const checkOwnerOnly = (command, message) => {
    if (command.ownerOnly && message.author.id !== 'YOUR_OWNER_ID') {
        message.reply('Cette commande est réservée au propriétaire du bot.');
        return false;
    }

    return true;
};

const checkDMOnly = (command, message) => {
    if (command.dmOnly && message.channel.type !== 'DM') {
        message.reply('Cette commande ne peut être utilisée que dans les messages privés.');
        return false;
    }

    return true;
};

const checkServerOnly = (command, message) => {
    if (command.serverOnly && message.channel.type === 'DM') {
        message.reply('Cette commande ne peut être utilisée que dans les serveurs.');
        return false;
    }

    return true;
};

const checkDisabled = (command) => {
    // Implémentez la vérification si la commande est désactivée ici
    // Vous pouvez utiliser une structure similaire à checkCooldown en utilisant un Map ou stocker les commandes désactivées dans la base de données
    // Pour cet exemple, je vais simplement retourner `false` pour indiquer que la commande n'est pas désactivée
    return false;
};

module.exports = {
    checkCooldown,
    checkPermissions,
    checkOwnerOnly,
    checkDMOnly,
    checkServerOnly,
    checkDisabled,
};
