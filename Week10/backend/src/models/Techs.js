const mongoose = require('mongoose');

const TechsSchema = new mongoose.Schema({
    name:               String,
});

module.exports = mongoose.model('Techs', TechsSchema);