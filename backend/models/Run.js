const mongoose = require('mongoose');
const runSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('Run', runSchema, 'runs');