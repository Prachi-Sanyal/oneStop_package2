const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    user_id: { type: String, required: true },
    stars: { type: Number, required: true },
    review_message: { type: String, required: true },
    image_url: { type: String },
});

const Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;
