const express = require('express');
const router = express.Router();

const { createPaymentIntent,stripeWebhook } = require("../controller/paymentController.js");



router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', stripeWebhook);

module.exports = router;