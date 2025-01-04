const express = require('express');
const router = express.Router();
const { addContact, getAllContacts, deleteContact } = require('../controllers/contactControllers');

// Route for adding a contact
router.post('/addcontact', addContact);

// Route for fetching all contacts
router.get('/getallcontacts', getAllContacts);

// Route for deleting a contact by ID
router.delete('/deletecontact/:id', deleteContact);

module.exports = router;
