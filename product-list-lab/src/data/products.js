// src/data/products.js
export const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์' },
    { id: 'clothing', name: 'เสื้อผ้า' },
    { id: 'books', name: 'หนังสือ' },
    { id: 'home', name: 'ของใช้ในบ้าน' }
];

export const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'electronics',
        price: 45900,
        originalPrice: 48900,
        discount: 6,
        image: 'https://placehold.co/300x300/007bff/ffffff?text=iPhone+15',
        description: 'สมาร์ทโฟนล่าสุดจาก Apple',
        inStock: true,
        rating: 4.8
    },
    {
        id: 2,
        name: 'เสื้อยืดผ้าฝ้าย',
        category: 'clothing',
        price: 299,
        originalPrice: 350,
        discount: 15,
        image: 'https://placehold.co/300x300/ffc107/000000?text=T-Shirt',
        description: 'เสื้อยืดผ้าฝ้าย 100% นุ่มสบาย',
        inStock: true,
        rating: 4.2
    },
    {
        id: 3,
        name: 'หนังสือ React.js Guide',
        category: 'books',
        price: 650,
        originalPrice: 650,
        discount: 0,
        image: 'https://placehold.co/300x300/17a2b8/ffffff?text=React+Book',
        description: 'คู่มือเรียนรู้ React.js ฉบับสมบูรณ์',
        inStock: false,
        rating: 4.7
    },
    {
        id: 4,
        name: 'หูฟังไร้สาย Sony WH-1000XM5',
        category: 'electronics',
        price: 12990,
        originalPrice: 14990,
        discount: 13,
        image: 'https://placehold.co/300x300/6f42c1/ffffff?text=Sony+XM5',
        description: 'หูฟังตัดเสียงรบกวนระดับเทพ',
        inStock: true,
        rating: 4.9
    },
    {
        id: 5,
        name: 'กางเกงยีนส์',
        category: 'clothing',
        price: 890,
        originalPrice: 890,
        discount: 0,
        image: 'https://placehold.co/300x300/28a745/ffffff?text=Jeans',
        description: 'กางเกงยีนส์ทรงกระบอกเล็ก ผ้ายืด',
        inStock: true,
        rating: 4.0
    },
    {
        id: 6,
        name: 'เครื่องชงกาแฟ',
        category: 'home',
        price: 2500,
        originalPrice: 3200,
        discount: 22,
        image: 'https://placehold.co/300x300/dc3545/ffffff?text=Coffee+Maker',
        description: 'เครื่องชงกาแฟสดอัตโนมัติ',
        inStock: true,
        rating: 4.5
    },
    {
        id: 7,
        name: 'The Lord of the Rings',
        category: 'books',
        price: 1200,
        originalPrice: 1200,
        discount: 0,
        image: 'https://placehold.co/300x300/fd7e14/000000?text=LOTR+Book',
        description: 'วรรณกรรมแฟนตาซีระดับโลก',
        inStock: false,
        rating: 4.9
    }
];