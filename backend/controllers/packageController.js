const Package = require('../models/packageModel');

const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find({}, 'category package_name price guest_limit services');
        res.json(packages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPackagesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const packages = await Package.find({ category }, 'category package_name price guest_limit services');
        res.json(packages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


    const getPackageDetailsById = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        res.json(package);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





module.exports = {
    getAllPackages,
    getPackagesByCategory,
    getPackageDetailsById
};
