import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from './CheckoutModal';
import './Shop.css'; // Reusing some shop styles for consistency

const Cart = () => {
  const [cartData, setCartData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const data = await api.cart.get();
      setCartData(data);
    } catch (err) {
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await api.cart.remove(itemId);
      // Refresh cart from server to get updated totals
      fetchCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const handleClear = async () => {
    try {
      await api.cart.clear();
      setCartData({ items: [], total: 0 });
    } catch (err) {
      alert("Failed to clear cart");
    }
  };

  if (loading) return <div className="shop-section">Loading cart...</div>;
  if (error) return <div className="shop-section">{error}</div>;

  return (
    <section className="shop-section">
      <div className="shop-list-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="product-title">Your Cart</h1>
        {cartData.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartData.items.map(item => (
                <div key={item.id} className="cart-item" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '20px',
                  borderBottom: '1px solid #eee'
                }}>
                  <div>
                    <h3>{item.product_name}</h3>
                    <p>{item.product_variant}</p>
                    <p>Qty: {item.quantity} x ${item.price.toFixed(2)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <p style={{ fontWeight: 'bold' }}>${item.subtotal.toFixed(2)}</p>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary" style={{ marginTop: '40px', textAlign: 'right' }}>
              <h2>Total: ${cartData.total.toFixed(2)}</h2>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginTop: '20px' }}>
                <button 
                  onClick={handleClear}
                  style={{ background: '#666', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Clear Cart
                </button>
                <button 
                  className="add-to-cart" 
                  style={{ width: 'auto', padding: '10px 30px' }}
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cartItems={cartData.items}
        total={cartData.total}
      />
    </section>
  );
};

export default Cart;
