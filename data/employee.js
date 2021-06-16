const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    companyId: String
});

module.exports = mongoose.model('Employee', employeeSchema, "employee");