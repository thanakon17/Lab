const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// Helper function: อ่านข้อมูลอาหาร
const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// GET /api/foods - ดึงรายการอาหารทั้งหมด (พร้อม filtering)
router.get('/', (req, res) => {
    try {
        let foods = loadFoods();
        
        // TODO: เพิ่ม query parameters สำหรับ filtering:
        const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;
        
        // TODO: ทำ filtering logic ตาม query parameters
        
        // - search: ค้นหาจากชื่อหรือคำอธิบาย
        if (search) {
            foods = foods.filter(f =>
                f.name.toLowerCase().includes(search.toLowerCase()) ||
                f.description.toLowerCase().includes(search.toLowerCase())
            );
        }
        // - category: กรองตามประเภทอาหาร
        if (category) {
            foods = foods.filter(f => f.category.toLowerCase() === category.toLowerCase());
        }
        // - maxSpicy: กรองระดับความเผ็ดไม่เกินที่กำหนด
        if (maxSpicy) {
            foods = foods.filter(f => f.spicyLevel <= parseInt(maxSpicy));
        }
        // - vegetarian: กรองอาหารมังสวิรัติ (true/false)
        if (vegetarian) {
            foods = foods.filter(f => f.vegetarian.toString() === vegetarian);
        }
        // - available: กรองอาหารที่พร้อมเสิร์ฟ (true/false)
        if (available) {
            foods = foods.filter(f => f.available.toString() === available);
        }
        // - maxPrice: กรองราคาไม่เกินที่กำหนด
        if (maxPrice) {
            foods = foods.filter(f => f.price <= parseFloat(maxPrice));
        }
        
        res.json({
            success: true,
            data: foods,
            total: foods.length,
            filters: {
                search: search || null,
                category: category || null,
                maxSpicy: maxSpicy || null,
                vegetarian: vegetarian || null,
                available: available || null,
                maxPrice: maxPrice || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods'
        });
    }
});

// TODO: GET /api/foods/:id - ดึงข้อมูลอาหารตาม ID
router.get('/:id', (req, res) => {
    const foods = loadFoods();
    const food = foods.find(f => f.id === parseInt(req.params.id));
    if (food) {
        res.json({ success: true, data: food });
    } else {
        res.status(404).json({ success: false, message: 'Food not found' });
    }
});

// TODO: GET /api/foods/category/:category - ดึงอาหารตามประเภท
router.get('/category/:category', (req, res) => {
    const foods = loadFoods();
    const filteredFoods = foods.filter(f => f.category.toLowerCase() === req.params.category.toLowerCase());
    res.json({ success: true, data: filteredFoods, total: filteredFoods.length });
});

// TODO: GET /api/foods/random - ดึงอาหารแบบสุ่ม 1 จาน
// เราใช้ /get/random เพื่อป้องกันไม่ให้ 'random' ถูกจับโดย '/:id'
router.get('/get/random', (req, res) => {
    const foods = loadFoods();
    if (foods.length === 0) {
        return res.status(404).json({ success: false, message: 'No food available' });
    }
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    res.json({ success: true, data: randomFood });
});

module.exports = router;