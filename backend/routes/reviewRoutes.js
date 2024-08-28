const express = require('express');
const { getReviewsByPackageDetails } = require('../controllers/reviewController');
const router = express.Router();

router.get('/:category/:package_name', getReviewsByPackageDetails);

module.exports = router;
