import React from 'react';
import './CheckoutPage.css'; // Create this CSS file for styling

const CheckoutPage = () => {
  // In a real app, you'd fetch cart details or pass via state/context
  const total = localStorage.getItem('cartTotal') || 0;

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    // Clear cart, redirect, or call backend API here
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-summary">
        <p>Total Amount: <strong>${total}</strong></p>
        <button className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
