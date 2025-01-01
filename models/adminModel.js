const mongoose = require('mongoose');

// Define the Admin Schema
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create Admin model
const Admin = mongoose.model('Admin', AdminSchema);

// Export the Admin model
module.exports = Admin;
