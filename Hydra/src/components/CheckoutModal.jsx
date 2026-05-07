import React, { useState } from 'react';
import { api } from '../api';

const CheckoutModal = ({ isOpen, onClose, cartItems, total }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Create Order (Using the first item for simplicity in this example, 
      // or the backend might handle multiple items if updated)
      // Based on provided docs: POST /orders { customer_name, customer_email, customer_phone, product_id, quantity }
      
      for (const item of cartItems) {
          const order = await api.orders.create({
            ...formData,
            product_id: item.product_id,
            quantity: item.quantity
          });

          // 2. Initiate Payment
          const payment = await api.payments.initiate(order.id);
          
          if (payment.authorization_url) {
            window.location.href = payment.authorization_url;
            return;
          }
      }
      
      alert("Order placed successfully!");
      onClose();
    } catch (err) {
      setError("Failed to process checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="modal-content" style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '100%',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}>&times;</button>

        <h2 className="product-title" style={{ fontSize: '2rem', marginBottom: '20px' }}>Checkout</h2>
        
        <div className="order-summary" style={{ marginBottom: '30px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
          <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
          <p><strong>Items:</strong> {cartItems.length}</p>
        </div>

        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: '15px' }}>
            <label className="input-label">Full Name</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="John Doe"
              className="input-field"
              required
            />
          </div>
          <div className="input-group" style={{ marginBottom: '15px' }}>
            <label className="input-label">Email</label>
            <input
              type="email"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="input-field"
              required
            />
          </div>
          <div className="input-group" style={{ marginBottom: '25px' }}>
            <label className="input-label">Phone Number</label>
            <input
              type="tel"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              className="input-field"
              required
            />
          </div>

          <button 
            type="submit" 
            className="add-to-cart" 
            style={{ width: '100%', padding: '15px' }}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
