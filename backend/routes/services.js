
const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// ================= GET SERVICES =================
router.get('/', async (req, res) => {
  try {
    const { location, serviceType, minPrice, maxPrice, searchQuery } = req.query;

    let query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (serviceType) {
      query.serviceType = serviceType;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (searchQuery) {
      const safeQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape regex
      query.$or = [
        { title: { $regex: safeQuery, $options: 'i' } },
        { description: { $regex: safeQuery, $options: 'i' } }
      ];
    }

    const services = await Service.find(query)
      .populate('provider', 'name email isVerified')
      .lean();

    res.json(services);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ================= CREATE SERVICE =================
router.post('/', auth, async (req, res) => {
  try {
    // ✅ Safe role check
    if (!req.user || (req.user.role !== 'expert' && req.user.role !== 'admin')) {
      return res.status(403).json({ message: 'Not authorized to create services' });
    }

    const { title, description, serviceType, location, price } = req.body;

    // ✅ Validation
    if (!title || !description || !serviceType || !location || price === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (price < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    const service = await new Service({
      provider: req.user.id,
      title: title.trim(),
      description: description.trim(),
      serviceType,
      location: location.trim(),
      price: Number(price)
    }).save();

    res.json(service);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
