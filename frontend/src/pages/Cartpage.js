import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  // Reusable config with token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch cart items
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

  // Update quantity
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

  // Remove item from cart
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
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.book._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
            <h4>{item.book.title}</h4>
            <p>Author: {item.book.author}</p>
            <p>Price: ${item.book.price}</p>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.book._id, parseInt(e.target.value))}
            />
            <button onClick={() => handleRemove(item.book._id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
