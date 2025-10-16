import React, { useState } from 'react';
import ProductList from './components/ProductList';
import { products, categories } from './data/products';
import './App.css'; // หากมีไฟล์ App.css หรือ index.css

function App() {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        alert(`เพิ่ม ${product.name} ในตะกร้าแล้ว!`);
    };

    const handleViewDetails = (product) => {
        alert(
`ดูรายละเอียด: ${product.name}
ราคา: ฿${product.price.toLocaleString()}
คำอธิบาย: ${product.description}
เรตติ้ง: ${product.rating} ⭐`
        );
    };

    return (
        <div className="app">
            <div style={{ 
                position: 'fixed', 
                top: '20px', 
                right: '20px', 
                background: '#007bff', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '25px',
                zIndex: 1000,
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                fontSize: '16px'
            }}>
                🛒 ตะกร้า: {cart.length} ชิ้น
            </div>

            <ProductList 
                products={products}
                categories={categories}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
            />
        </div>
    );
}

export default App;