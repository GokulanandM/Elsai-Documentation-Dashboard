const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('Project', projectSchema, 'projects');