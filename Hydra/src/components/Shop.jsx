import React, { useState, useEffect } from 'react';
import './Shop.css';
import productImg from '../assets/images/pic1.jpg'; // Default image if backend doesn't provide one
import { api } from '../api';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from './CheckoutModal';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [checkoutData, setCheckoutData] = useState(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.products.getAll();
        setProducts(data);
        const initialQuantities = {};
        data.forEach(p => initialQuantities[p.id] = 1);
        setQuantities(initialQuantities);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const qty = quantities[productId] || 1;
      await api.cart.add(productId, qty);
      alert("Added to cart!");
    } catch (err) {
      alert("Failed to add to cart. Please try again.");
    }
  };

  const handleBuyNow = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const qty = quantities[product.id] || 1;
    setCheckoutData({
      items: [{ product_id: product.id, quantity: qty }],
      total: product.price * qty
    });
  };

  if (loading) return <div className="shop-section">Loading products...</div>;
  if (error) return <div className="shop-section">{error}</div>;

  return (
    <section className="shop-section">
      <div className="shop-list-container">
        {products.map(product => (
          <div key={product.id} className="shop-container" style={{ marginBottom: '80px' }}>
            <div className="shop-visual">
              <img src={product.image_url || productImg} alt={product.name} className="product-image" />
              {product.is_best_seller && <div className="product-badge">Best Seller</div>}
            </div>

            <div className="shop-details">
              <span className="brand-tag">{product.category || 'Premium Hydration'}</span>
              <h1 className="product-title">{product.name}</h1>
              <p className="price-tag">${(product.price * (quantities[product.id] || 1)).toFixed(2)}</p>
              
              <p className="product-description">
                {product.description || "Naturally carbonated and sourced from high-altitude springs."}
              </p>

              <div className="purchase-controls" style={{ flexWrap: 'wrap' }}>
                <div className="quantity-selector">
                  <button onClick={() => handleQuantityChange(product.id, -1)}>−</button>
                  <span>{quantities[product.id] || 1}</span>
                  <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                </div>
                <button 
                  className="add-to-cart" 
                  style={{ background: '#666', flexGrow: 0, padding: '10px 20px' }}
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
                <button 
                  className="add-to-cart" 
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
              </div>

              <div className="product-features">
                <div className="feature">
                  <strong>Source</strong>
                  <span>{product.source || 'Alpine Springs'}</span>
                </div>
                <div className="feature">
                  <strong>Carbonation</strong>
                  <span>{product.carbonation || 'Light & Crisp'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CheckoutModal 
        isOpen={!!checkoutData} 
        onClose={() => setCheckoutData(null)}
        cartItems={checkoutData?.items || []}
        total={checkoutData?.total || 0}
      />
    </section>
  );
};

export default Shop;
