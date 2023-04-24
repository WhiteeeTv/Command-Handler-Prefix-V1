const { Schema, model } = require('mongoose');

const prefixSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
    },
});

module.exports = model('Prefix', prefixSchema);
