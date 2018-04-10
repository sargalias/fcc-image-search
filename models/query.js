const mongoose = require('mongoose');

const query = new mongoose.Schema({
    query: {type: String, required: true},
    when: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('Query', query);