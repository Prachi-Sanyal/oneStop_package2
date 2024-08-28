const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
const packageRoutes = require('./routes/packageRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/packages', packageRoutes);
app.use('/api/reviews', reviewRoutes);

module.exports = app;
