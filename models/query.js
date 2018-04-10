const mongoose = require('mongoose');

const query = new mongoose.Schema({
    query: {type: String, required: true},
    offset: {type: Number, default: 0},
    when: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('Query', query);