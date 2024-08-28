const Review = require('../models/reviewModel'); // Make sure this path is correct


exports.getReviewsByPackageDetails = async (req, res) => {
    const { category, package_name } = req.params;

    try {
        console.log('Received category:', category, 'and package_name:', package_name);

        const reviews = await Review.find({ category, package_name });
        console.log('Fetched Reviews:', reviews);

        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};
