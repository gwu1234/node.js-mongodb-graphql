const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    id: String,
    name: String,
    location: String,
    rating: Number
});

module.exports = mongoose.model('Company', companySchema, "company");