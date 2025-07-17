const express = require('express');
const router = express.Router();
const webhookController = require('../controller/webhookController');

router.post('/stripe', webhookController.stripeWebhook);

module.exports = router;
