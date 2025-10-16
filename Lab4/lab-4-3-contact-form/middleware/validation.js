// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{9,10}$/; // อนุญาต 9 หรือ 10 หลัก

// Contact form validation
const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];
    
    // TODO: ตรวจสอบ name
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
        errors.push('Name is required and must be between 2 and 100 characters.');
    }
    
    // TODO: ตรวจสอบ email
    if (!email || !emailRegex.test(email)) {
        errors.push('A valid email is required.');
    }
    
    // TODO: ตรวจสอบ subject
    if (!subject || typeof subject !== 'string' || subject.trim().length < 5 || subject.trim().length > 200) {
        errors.push('Subject is required and must be between 5 and 200 characters.');
    }
    
    // TODO: ตรวจสอบ message
    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 1000) {
        errors.push('Message is required and must be between 10 and 1000 characters.');
    }
    
    // TODO: ตรวจสอบ phone (optional)
    if (phone && !phoneRegex.test(phone)) {
        errors.push('Phone number must be 9 or 10 digits.');
    }
    
    // TODO: ตรวจสอบ company (optional)
    if (company && company.length > 100) {
        errors.push('Company name cannot exceed 100 characters.');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }
    
    // Sanitize data
    req.body.name = req.body.name.trim();
    req.body.email = req.body.email.trim().toLowerCase();
    req.body.subject = req.body.subject.trim();
    req.body.message = req.body.message.trim();
    if (req.body.phone) req.body.phone = req.body.phone.trim();
    if (req.body.company) req.body.company = req.body.company.trim();
    
    next();
};

// Feedback validation
const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];
    
    // TODO: ตรวจสอบ rating
    const numRating = parseInt(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
        errors.push('Rating must be a number between 1 and 5.');
    }
    
    // TODO: ตรวจสอบ comment
    if (!comment || typeof comment !== 'string' || comment.trim().length < 5 || comment.trim().length > 500) {
        errors.push('Comment is required and must be between 5 and 500 characters.');
    }
    
    // TODO: ตรวจสอบ email (optional)
    if (email && !emailRegex.test(email)) {
        errors.push('If provided, email must be a valid format.');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    // Sanitize data
    req.body.rating = numRating;
    req.body.comment = req.body.comment.trim();
    if (req.body.email) req.body.email = req.body.email.trim().toLowerCase();
    
    next();
};

module.exports = {
    validateContact,
    validateFeedback
};