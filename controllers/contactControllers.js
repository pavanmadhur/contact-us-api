const Contact = require('../models/contactModel');

const addContact = async (req, res) => {
    console.log("Incoming request body:", req.body); // Log to debug

    const { name, email, message } = {
        name: req.body.name || req.body.Name,
        email: req.body.email || req.body.Email,
        message: req.body.message || req.body.Message,
    };

    if (!name || !email || !message) {
        console.log("Validation failed: Missing fields");
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const contact = await Contact.create({ name, email, message });
        console.log("Contact created successfully:", contact);
        res.status(201).json(contact);
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};





// Get all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No contacts found',
            });
        }

        res.status(200).json({
            success: true,
            data: contacts,
            message: 'Contacts fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching contacts:', error.message); // Log for debugging
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

module.exports = { addContact, getAllContacts };
