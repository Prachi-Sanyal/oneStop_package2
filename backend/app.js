// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./db/connection');
const packageRoutes = require('./routes/packageRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config({ path: './config/.env' });

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/payment', paymentRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/reviews', reviewRoutes);

module.exports = app;
