// middleware/logger.js
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    // Log ข้อมูล request: [เวลา] Method URL
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next(); // ส่งต่อไปยัง middleware หรือ route handler ถัดไป
};

module.exports = logger;