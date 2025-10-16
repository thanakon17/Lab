// Global variables
let isSubmitting = false;

// DOM Elements
const contactForm = document.getElementById('contactForm');
const feedbackForm = document.getElementById('feedbackForm');
const statusMessages = document.getElementById('statusMessages');
const apiResults = document.getElementById('apiResults');
const ratingSlider = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeForms();
    setupEventListeners();
});

function initializeForms() {
    // Update rating display
    ratingSlider.addEventListener('input', () => {
        ratingValue.textContent = ratingSlider.value;
    });
}

function setupEventListeners() {
    // Contact form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitContactForm();
    });

    // Feedback form submission
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitFeedbackForm();
    });

    // TODO: (Bonus) เพิ่ม real-time validation สำหรับ input fields
    // ตัวอย่าง:
    document.getElementById('name').addEventListener('input', (e) => {
        validateField(e.target, 'nameError', val => val.length >= 2 && val.length <= 100, 'Name must be 2-100 chars');
    });
    document.getElementById('email').addEventListener('input', (e) => {
        validateField(e.target, 'emailError', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Must be a valid email');
    });
    document.getElementById('phone').addEventListener('input', (e) => {
        validateField(e.target, 'phoneError', val => val.length === 0 || /^[0-9]{9,10}$/.test(val), 'Must be 9-10 digits or empty');
    });
}

// TODO: (Bonus) สร้างฟังก์ชัน validateField สำหรับ client-side validation
function validateField(inputElement, errorElementId, validationFn, errorMessage) {
    const errorElement = document.getElementById(errorElementId);
    const value = inputElement.value.trim();
    
    if (validationFn(value)) {
        inputElement.classList.add('valid');
        inputElement.classList.remove('invalid');
        errorElement.textContent = '';
    } else {
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid');
        errorElement.textContent = errorMessage;
    }
}

async function submitContactForm() {
    if (isSubmitting) return;
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    try {
        isSubmitting = true;
        updateSubmitButton('contactSubmit', 'กำลังส่ง...', true);
        
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showStatusMessage('✅ ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็ว', 'success');
            contactForm.reset();
        } else {
            // รวม error messages ทั้งหมด
            const errorMessage = result.errors ? result.errors.join(', ') : result.message;
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${errorMessage}`, 'error');
        }
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        console.error('Error:', error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('contactSubmit', 'ส่งข้อความ', false);
    }
}

async function submitFeedbackForm() {
    if (isSubmitting) return;
    
    const formData = new FormData(feedbackForm);
    const data = Object.fromEntries(formData.entries());
    // แปลง rating เป็นตัวเลข
    data.rating = parseInt(data.rating, 10);
    
    try {
        isSubmitting = true;
        updateSubmitButton('feedbackSubmit', 'กำลังส่ง...', true);
        
        // TODO: ส่งข้อมูลไปยัง /api/feedback endpoint
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        // TODO: จัดการ response และแสดงผลลัพธ์
        if (result.success) {
            showStatusMessage('✅ ขอบคุณสำหรับความคิดเห็น!', 'success');
            feedbackForm.reset();
            // Reset slider display
            ratingValue.textContent = '3';
        } else {
            const errorMessage = result.errors ? result.errors.join(', ') : result.message;
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${errorMessage}`, 'error');
        }
        
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        console.error('Error:', error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('feedbackSubmit', 'ส่งความคิดเห็น', false);
    }
}

function showStatusMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-message ${type}`;
    messageDiv.textContent = message;
    
    statusMessages.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function updateSubmitButton(buttonId, text, disabled) {
    const button = document.getElementById(buttonId);
    button.textContent = text;
    button.disabled = disabled;
}

// (ฟังก์ชันนี้ไม่ได้ใช้ใน submitContactForm แต่มีประโยชน์สำหรับ real-time validation)
function displayValidationErrors(errors) {
    errors.forEach(error => {
        // อาจจะซับซ้อนกว่านี้ ถ้าจะ map error กับ field ที่ถูกต้อง
        // สำหรับตอนนี้ แสดงผลใน status message ไปก่อน
        showStatusMessage(`🔸 ${error}`, 'error');
    });
}

// Helper function for API Testing
async function testApiEndpoint(endpoint, element) {
     try {
        element.textContent = `Loading ${endpoint}...`;
        const response = await fetch(endpoint);
        const data = await response.json();
        element.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        element.textContent = `Error loading ${endpoint}: ${error.message}`;
    }
}

// API Testing Functions
function loadContacts() {
    // TODO: เรียก GET /api/contact และแสดงผลลัพธ์
    testApiEndpoint('/api/contact', apiResults);
}

function loadFeedbackStats() {
    // TODO: เรียก GET /api/feedback/stats และแสดงผลลัพธ์
    testApiEndpoint('/api/feedback/stats', apiResults);
}

function loadAPIStatus() {
    // TODO: เรียก GET /api/status และแสดงผลลัพธ์
    testApiEndpoint('/api/status', apiResults);
}

async function loadAPIDocs() {
    // (ฟังก์ชันนี้มีอยู่แล้ว และทำงานได้)
    try {
        apiResults.textContent = 'Loading API docs...';
        const response = await fetch('/api/docs');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading API docs: ' + error.message;
    }
}