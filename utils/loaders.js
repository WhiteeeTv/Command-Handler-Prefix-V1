const loadCommands = require('./loadCommands');
const loadEvents = require('./loadEvents');
const connectDB = require('./connectDB');

module.exports.loadCommands = async (client) => {
    await loadCommands(client);
};

module.exports.loadEvents = async (client) => {
    await connectDB();
    await loadEvents(client);
};
