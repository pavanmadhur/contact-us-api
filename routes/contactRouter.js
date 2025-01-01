const express = require('express');
const Contact = require('../models/contactModel');
const { addContact,getAllContacts } = require('../controllers/contactControllers');
const protect = require('../middleware/authMiddleware');

const router = express.Router();



router.post('/addcontact', addContact);
// Get All Contacts
router.get('/getallcontacts', protect, getAllContacts);

module.exports = router;
