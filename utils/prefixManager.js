const { MongoClient } = require('mongodb');
const { mongoURI } = require('../config.json');

module.exports.getPrefix = async (guildId) => {
    const client = new MongoClient(mongoURI);
    await client.connect();
    const db = client.db('Cluster0');
    const collection = db.collection('prefixes');

    const prefixData = await collection.findOne({ guildId: guildId });
    if (!prefixData) {
        await collection.insertOne({ guildId: guildId, prefix: '+' });
        return '+';
    }
    client.close();

    return prefixData.prefix;
};
