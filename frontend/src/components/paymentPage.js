// src/pages/PaymentPage.js

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import axios from 'axios';

// Your Stripe publishable key (pk_test_xxx)
const stripePromise = loadStripe('pk_test_xxxxxxxxxxxxxxxxxx');

const PaymentPage = ({ orderId }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch clientSecret from backend
    axios
      .post('/api/payment/create-payment-intent', { orderId })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [orderId]);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <h2>Checkout</h2>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm orderId={orderId} clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
