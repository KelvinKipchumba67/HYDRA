import React, { useState } from 'react';
import './Shop.css';
import productImg from '../assets/images/pic1.jpg';

const Shop = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 2.50;

  return (
    <section className="shop-section">
      <div className="shop-container">
        {/* Left: Product Image */}
        <div className="shop-visual">
          <img src={productImg} alt="Hydra Sparkling Bottle" className="product-image" />
          <div className="product-badge">Best Seller</div>
        </div>

        {/* Right: Product Details */}
        <div className="shop-details">
          <span className="brand-tag">Premium Hydration</span>
          <h1 className="product-title">Hydra Sparkling <br/>Mineral Water</h1>
          <p className="price-tag">${(price * quantity).toFixed(2)}</p>
          
          <p className="product-description">
            Naturally carbonated and sourced from high-altitude springs. 
            Hydra Sparkling offers a crisp, clean finish with an optimized 
            electrolyte blend for superior hydration.
          </p>

          <div className="purchase-controls">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>

          <div className="product-features">
            <div className="feature">
              <strong>Source</strong>
              <span>Alpine Springs</span>
            </div>
            <div className="feature">
              <strong>Carbonation</strong>
              <span>Light & Crisp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;