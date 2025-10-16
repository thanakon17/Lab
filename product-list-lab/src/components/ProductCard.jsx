import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ product, onAddToCart, onViewDetails }) {

    // Challenge 2: ฟังก์ชันสำหรับแสดงดาว
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        return (
            <div className="star-rating">
                {'⭐'.repeat(fullStars)}
                {hasHalfStar && '🌗'}
                {'☆'.repeat(emptyStars)}
                <span className="rating-text">({rating.toFixed(1)})</span>
            </div>
        );
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/300x300/cccccc/666666?text=No+Image';
                    }}
                />
            </div>
            
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                {/* Challenge 2: แสดง rating stars */}
                {renderStars(product.rating)}
                
                <div className="product-price">
                    <span>฿{product.price.toLocaleString()}</span>
                    {/* Challenge 1: แสดงราคาเดิมและส่วนลด */}
                    {product.discount > 0 && (
                        <>
                            <span className="original-price">
                                ฿{product.originalPrice.toLocaleString()}
                            </span>
                            <span className="discount-badge">
                                -{product.discount}%
                            </span>
                        </>
                    )}
                </div>
                
                <div className="product-actions">
                    <button 
                        className="btn btn-secondary"
                        onClick={() => onViewDetails(product)}
                    >
                        ดูรายละเอียด
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}
                    >
                        {product.inStock ? 'ใส่ตะกร้า' : 'หมดสินค้า'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Challenge 1: ปรับปรุง PropTypes ให้ละเอียดมากขึ้น
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        originalPrice: PropTypes.number,
        discount: PropTypes.number,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        inStock: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default ProductCard;