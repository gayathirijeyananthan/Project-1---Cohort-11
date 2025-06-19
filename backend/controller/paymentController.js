const stripe = require('../config/stripe.js');
const Order = require('../models/Order.js'); // Assuming you have an Order model

exports.createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Fetch order from DB
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // in cents
      currency: 'usd', // or your currency
      metadata: { orderId: order._id.toString() },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Stripe will send event notifications to your backend via webhooks. You need to verify and handle them:


exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.log('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    const orderId = paymentIntent.metadata.orderId;

    // Update order status in DB to 'Processing' or 'Paid'
    await Order.findByIdAndUpdate(orderId, { status: 'Processing' });

    console.log(`Payment for order ${orderId} succeeded.`);
  }

  res.json({ received: true });
};
