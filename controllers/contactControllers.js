const Contact = require('../models/contactModel');

// Add a new contact
const addContact = async (req, res) => {
    console.log("Incoming request body:", req.body);

    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        console.log("Validation failed: Missing fields");
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        // Create new contact
        const contact = await Contact.create({ name, email, message });
        console.log("Contact created successfully in DB:", contact);
        return res.status(201).json(contact);
    } catch (error) {
        console.error("Error creating contact in DB:", error.message);
        return res.status(500).json({ message: "Server Error" });
    }
};

// Get all contacts
const getAllContacts = async (req, res) => {
    console.log("Fetching all contacts...");

    try {
        // Fetch all contacts from the database
        const contacts = await Contact.find();
        console.log("Contacts fetched from DB:", contacts);

        // Send response with contacts data
        res.status(200).json({
            success: true,
            data: contacts,
            message: contacts.length ? 'Contacts fetched successfully' : 'No contacts found',
        });
    } catch (error) {
        console.error('Error fetching contacts from DB:', error.message);
        return res.status(500).json({ message: 'Something went wrong on the server' });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    console.log("Incoming delete request for ID:", req.params.id);

    const { id } = req.params;

    // Validate ID
    if (!id) {
        console.log("Validation failed: Missing ID");
        return res.status(400).json({ message: 'Contact ID is required' });
    }

    try {
        // Find and delete contact by ID
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            console.log("Contact not found in DB with ID:", id);
            return res.status(404).json({ message: 'Contact not found' });
        }

        console.log("Contact deleted successfully with ID:", id);
        return res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact from DB:', error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { addContact, getAllContacts, deleteContact };
