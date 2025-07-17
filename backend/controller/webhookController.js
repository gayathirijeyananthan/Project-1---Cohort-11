const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const dotenv = require('dotenv');
dotenv.config();

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify Stripe signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Only handle successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
          console.log('PaymentIntent was successful:', paymentIntent.id);


    // Get order ID from metadata (should be passed when creating the paymentIntent)
    const orderId = paymentIntent.metadata.orderId;

    try {
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      // ✅ 1. Update Order's payment status
      order.paymentStatus = 'completed';
      await order.save();

      // ✅ 2. Create new Payment record
      const payment = new Payment({
        order: order._id,
        user: order.user,
        amount: paymentIntent.amount / 100, // Stripe sends amount in cents
        paymentMethod: paymentIntent.payment_method_types[0], // e.g., "card"
        paymentStatus: 'completed',
        transactionId: paymentIntent.id,
        paidAt: new Date()
      });

      await payment.save();

      console.log(`✅ Payment for Order ${orderId} recorded successfully.`);
    } catch (error) {
      console.error('❌ Error saving payment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Always return a 200 response to acknowledge receipt
  res.json({ received: true });
};
