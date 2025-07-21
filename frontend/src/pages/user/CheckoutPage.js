import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch cart items from localStorage or context
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);

    // Calculate total
    const totalPrice = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token'); // if using JWT auth

      const response = await axios.post(
        'http://localhost:5000/api/orders',
        {
          books: cartItems.map((item) => ({
            book: item._id,
            quantity: item.quantity,
          })),
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Order placed successfully!');
      localStorage.removeItem('cart');
      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error placing order:', error);
      setMessage('Failed to place order.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cartItems.map((item) => (
        <div key={item._id} className="mb-2">
          <p>{item.title} x {item.quantity}</p>
          <p className="text-sm text-gray-500">Rs. {item.price} each</p>
        </div>
      ))}
      <hr className="my-4" />
      <h2 className="text-xl font-semibold">Total: Rs. {total}</h2>
      <button
        onClick={handlePlaceOrder}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Place Order
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default CheckoutPage;
