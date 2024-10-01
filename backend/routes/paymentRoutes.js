const express = require('express');
const { createPaymentSession } = require('../controllers/paymentController');

const router = express.Router();

// POST route to create a payment session
router.post('/payment', createPaymentSession);

module.exports = router;
