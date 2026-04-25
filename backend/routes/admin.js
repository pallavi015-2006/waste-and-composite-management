
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// ✅ Admin middleware (safe check)
const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

// ✅ GET /api/admin/users
// Get all users (for expert verification)
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['expert', 'user'] } })
      .select('-password -otp -resetOtp')
      .lean();

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ PATCH /api/admin/users/:id/verify
// Toggle expert verification
router.patch('/users/:id/verify', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isVerified = !user.isVerified;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ GET /api/admin/stats
// Get platform statistics
router.get('/stats', auth, adminAuth, async (req, res) => {
  try {
    const [totalUsers, totalExperts, totalServices, totalBookings] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'expert' }),
      Service.countDocuments(),
      Booking.countDocuments()
    ]);

    res.json({ totalUsers, totalExperts, totalServices, totalBookings });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ GET /api/admin/bookings
// Get all bookings across platform
router.get('/bookings', auth, adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('service', 'title')
      .populate('user', 'name email')
      .populate('provider', 'name')
      .sort({ createdAt: -1 })
      .lean();

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;