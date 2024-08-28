const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    category: String,
    package_name: String,
    price: Number,
    guest_limit: Number,
    services: mongoose.Schema.Types.Mixed,
    description: String,
});

module.exports = mongoose.model('packages', packageSchema);
