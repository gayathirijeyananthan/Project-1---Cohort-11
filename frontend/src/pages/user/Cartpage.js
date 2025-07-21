import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartPage.css'; // ✅ Import the external CSS

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', config);
      setCart(res.data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (bookId, quantity) => {
    try {
      await axios.put(
        'http://localhost:5000/api/cart',
        { bookId, quantity },
        config
      );
      loadCart();
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${bookId}`, config);
      loadCart();
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.book._id}>
            <div className="cart-details">
              <h4>{item.book.title}</h4>
              <div className="cart-info">
                <p>Author: {item.book.author}</p>
                <p>Price: ${item.book.price}</p>
              </div>
            </div>
            <div className="cart-controls">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.book._id, parseInt(e.target.value))
                }
              />
              <button onClick={() => handleRemove(item.book._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
