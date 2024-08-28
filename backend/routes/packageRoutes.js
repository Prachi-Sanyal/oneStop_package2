const express = require('express');
const router = express.Router();
const { getAllPackages, getPackagesByCategory, getPackageDetailsById } = require('../controllers/packageController');

router.get('/', getAllPackages);
router.get('/:category', getPackagesByCategory);
router.get('/details/:id', getPackageDetailsById);

module.exports = router;
