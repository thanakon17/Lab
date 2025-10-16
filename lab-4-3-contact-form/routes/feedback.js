const express = require('express');
const router = express.Router();
const { validateFeedback } = require('../middleware/validation');
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');

// POST /api/feedback - บันทึกความคิดเห็น
router.post('/', validateFeedback, async (req, res) => {
    try {
        const newFeedback = await appendToJsonFile('feedback.json', req.body);
        if (newFeedback) {
            res.status(201).json({ success: true, message: 'Feedback saved successfully', data: newFeedback });
        } else {
            res.status(500).json({ success: false, message: 'Failed to save feedback' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// GET /api/feedback/stats - ดึงสถิติความคิดเห็น
router.get('/stats', async (req, res) => {
    try {
        const feedbacks = await readJsonFile('feedback.json');
        
        if (feedbacks.length === 0) {
            return res.json({
                success: true,
                total: 0,
                averageRating: 0,
                ratingCounts: {}
            });
        }
        
        const total = feedbacks.length;
        const totalRating = feedbacks.reduce((sum, item) => sum + item.rating, 0);
        const averageRating = (totalRating / total).toFixed(2);
        
        const ratingCounts = feedbacks.reduce((acc, item) => {
            acc[item.rating] = (acc[item.rating] || 0) + 1;
            return acc;
        }, { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }); // สร้าง key เริ่มต้น
        
        res.json({ success: true, total, averageRating: parseFloat(averageRating), ratingCounts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve feedback stats' });
    }
});

module.exports = router;