const stripe = require('../config/stripe.js');
const Order = require('../models/Order.js');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;

    // 1. Fetch order
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // 2. Prevent duplicate payment
    if (order.paymentStatus === 'completed') {
      return res.status(400).json({ message: 'Order already paid' });
    }

    // 3. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100),
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        orderId: order._id.toString()
      }
    });

    // 4. Send client secret to frontend
    res.json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error('❌ Stripe Payment Intent Error:', error);
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
};
