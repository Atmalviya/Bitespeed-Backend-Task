const Contact = require('../models/contact');
const { Op } = require('sequelize');

const identify = async (req, res) => {
    const { email, phoneNumber } = req.body;

    console.log('Received request body:', req.body);

    // Ensure email and phoneNumber are valid
    if (!email && !phoneNumber) {
        console.log('Email or phone number is required');
        return res.status(400).json({ error: 'Email or phone number is required' });
    }

    try {
        // Prepare the where clause conditionally
        const whereClause = {};
        if (email) whereClause.email = email;
        if (phoneNumber) whereClause.phoneNumber = phoneNumber;

        console.log('Where clause for query:', whereClause);

        // Fetch contacts based on the where clause
        const contacts = await Contact.findAll({
            where: {
                [Op.or]: [
                    whereClause.email ? { email: whereClause.email } : null,
                    whereClause.phoneNumber ? { phoneNumber: whereClause.phoneNumber } : null
                ].filter(Boolean) // Filter out null values
            }
        });

        console.log('Contacts found:', contacts);

        // If no contacts are found, create a new primary contact
        if (contacts.length === 0) {
            console.log('No contacts found, creating new contact');
            const newContact = await Contact.create({
                email: email,
                phoneNumber: phoneNumber,
                linkPrecedence: 'primary'
            });

            console.log('New contact created:', newContact);

            return res.json({
                contact: {
                    primaryContatctId: newContact.id,
                    emails: email ? [email] : [],
                    phoneNumbers: phoneNumber ? [phoneNumber] : [],
                    secondaryContactIds: []
                }
            });
        }

        // Find the primary contact and secondary contacts
        const primaryContact = contacts.find(contact => contact.linkPrecedence === 'primary') || contacts[0];
        const secondaryContacts = contacts.filter(contact => contact.id !== primaryContact.id);

        // Collect unique emails and phone numbers
        const emails = Array.from(new Set(contacts.map(contact => contact.email).filter(Boolean)));
        const phoneNumbers = Array.from(new Set(contacts.map(contact => contact.phoneNumber).filter(Boolean)));

        const response = {
            primaryContatctId: primaryContact.id,
            emails: emails,
            phoneNumbers: phoneNumbers,
            secondaryContactIds: secondaryContacts.map(contact => contact.id)
        };

        console.log('Response:', response);

        // Add new email or phone number as a secondary contact if not already present
        if (email && !emails.includes(email)) {
            console.log('New email detected, creating secondary contact');
            await Contact.create({
                email: email,
                phoneNumber: phoneNumber,
                linkedId: primaryContact.id,
                linkPrecedence: 'secondary'
            });
            response.emails.push(email);
        }

        if (phoneNumber && !phoneNumbers.includes(phoneNumber)) {
            console.log('New phone number detected, creating secondary contact');
            await Contact.create({
                email: email,
                phoneNumber: phoneNumber,
                linkedId: primaryContact.id,
                linkPrecedence: 'secondary'
            });
            response.phoneNumbers.push(phoneNumber);
        }

        res.json({ contact: response });
    } catch (error) {
        console.error('Error identifying contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { identify };
