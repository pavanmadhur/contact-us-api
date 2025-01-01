const Contact = require('../models/contactModel');
const addContact = async (req, res) => {
    console.log("Incoming request body:", req.body);

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
        console.log("Contact created successfully in DB:", contact);
        res.status(201).json(contact);
    } catch (error) {
        console.error("Error creating contact in DB:", error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};






// Get all contacts
const getAllContacts = async (req, res) => {
    console.log("Fetching all contacts...");

    try {
        const contacts = await Contact.find();
        console.log("Contacts fetched from DB:", contacts);

        if (!contacts || contacts.length === 0) {
            console.log("No contacts found in DB");
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
        console.error('Error fetching contacts from DB:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};


module.exports = { addContact, getAllContacts };
