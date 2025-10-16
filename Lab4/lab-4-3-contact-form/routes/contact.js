const express = require('express');
const router = express.Router();
const { validateContact } = require('../middleware/validation');
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');

// POST /api/contact - บันทึกข้อมูลติดต่อ
router.post('/', validateContact, async (req, res) => {
    try {
        const newContact = await appendToJsonFile('contacts.json', req.body);
        if (newContact) {
            res.status(201).json({ success: true, message: 'Contact saved successfully', data: newContact });
        } else {
            res.status(500).json({ success: false, message: 'Failed to save contact' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// GET /api/contact - ดึงข้อมูลติดต่อทั้งหมด (พร้อม pagination)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const contacts = await readJsonFile('contacts.json');
        // เรียงจากใหม่ไปเก่า
        const sortedContacts = contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const results = {};
        results.totalItems = sortedContacts.length;
        results.totalPages = Math.ceil(sortedContacts.length / limit);
        results.currentPage = page;
        results.itemsPerPage = limit;
        results.data = sortedContacts.slice(startIndex, endIndex);
        
        res.json({ success: true, ...results });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve contacts' });
    }
});

module.exports = router;