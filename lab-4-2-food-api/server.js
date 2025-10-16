const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Import fs for /api/stats

// TODO: import foodRoutes จาก './routes/foods'
const foodRoutes = require('./routes/foods');
// TODO: import logger middleware จาก './middleware/logger'
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// TODO: ใช้ logger middleware
app.use(logger); // ใช้งาน logger กับทุก request

// Routes
app.get('/api', (req, res) => { // เปลี่ยน route จาก / เป็น /api เพื่อไม่ให้ชนกับ public/index.html
    res.json({
        message: '🍜 Welcome to Food API!',
        version: '1.0.0',
        endpoints: {
            foods: '/api/foods',
            search: '/api/foods?search=ผัด',
            category: '/api/foods?category=แกง',
            spicy: '/api/foods?maxSpicy=3',
            vegetarian: '/api/foods?vegetarian=true',
            documentation: '/api/docs'
        }
    });
});

// TODO: ใช้ foodRoutes สำหรับ '/api/foods'
app.use('/api/foods', foodRoutes);

// TODO: สร้าง route GET /api/docs
app.get('/api/docs', (req, res) => {
    res.json({
        message: "Food API Documentation",
        endpoints: [
            { path: "/api/foods", method: "GET", description: "Get all foods with filtering options.", queryParams: [
                { name: "search", type: "string", description: "Search by name or description" },
                { name: "category", type: "string", description: "Filter by category" },
                { name: "maxSpicy", type: "number", description: "Filter by max spicy level (0-5)" },
                { name: "vegetarian", type: "boolean", description: "Filter vegetarian options" },
                { name: "available", type: "boolean", description: "Filter available items" },
                { name: "maxPrice", type: "number", description: "Filter by max price" },
            ]},
            { path: "/api/foods/:id", method: "GET", description: "Get a specific food by its ID." },
            { path: "/api/foods/category/:category", method: "GET", description: "Get foods by a specific category." },
            { path: "/api/foods/random", method: "GET", description: "Get a single random food item." },
            { path: "/api/stats", method: "GET", description: "Get statistics about the food menu." },
        ]
    });
});

// TODO: สร้าง route GET /api/stats
app.get('/api/stats', (req, res) => {
    try {
        const foodData = fs.readFileSync(path.join(__dirname, './data/foods.json'), 'utf8');
        const foods = JSON.parse(foodData);

        const totalMenus = foods.length;
        // นับจำนวนเมนูในแต่ละหมวดหมู่
        const categories = foods.reduce((acc, food) => {
            acc[food.category] = (acc[food.category] || 0) + 1;
            return acc;
        }, {});
        const vegetarianCount = foods.filter(f => f.vegetarian).length;
        const availableCount = foods.filter(f => f.available).length;

        res.json({
            totalMenus,
            menusByCategory: categories,
            vegetarianCount,
            availableCount
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error calculating stats' });
    }
});


// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        requestedUrl: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Food API Server running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});