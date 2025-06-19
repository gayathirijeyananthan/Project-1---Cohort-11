const express = require('express');
const router = express.Router();
const { createPaymentIntent, stripeWebhook } = require("../controller/paymentController.js");

router.post('/create-payment-intent', createPaymentIntent);

// Use express.raw() for webhook
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
