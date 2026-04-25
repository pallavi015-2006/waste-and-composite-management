
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const auth = require('../middleware/auth');
const { sendEmail } = require('../utils/mailer');

// ================= CREATE BOOKING =================
router.post('/', auth, async (req, res) => {
  try {
    const { serviceId, scheduledDate, notes } = req.body;

    if (!serviceId || !scheduledDate) {
      return res.status(400).json({ message: 'Service and date required' });
    }

    if (new Date(scheduledDate) < new Date()) {
      return res.status(400).json({ message: 'Date must be in the future' });
    }

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const booking = await new Booking({
      user: req.user.id,
      service: serviceId,
      provider: service.provider,
      scheduledDate,
      notes
    }).save();

    res.json(booking);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ================= GET BOOKINGS =================
router.get('/', auth, async (req, res) => {
  try {
    let bookings;

    if (req.user.role === 'expert') {
      bookings = await Booking.find({ provider: req.user.id })
        .populate('service', 'title')
        .populate('user', 'name email')
        .lean();
    } else {
      bookings = await Booking.find({ user: req.user.id })
        .populate('service', 'title')
        .populate('provider', 'name')
        .lean();
    }

    res.json(bookings);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ================= UPDATE STATUS =================
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['pending', 'accepted', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('service', 'title');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.provider.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();

    await sendEmail({
      to: booking.user.email,
      subject: `Booking Update: ${status.toUpperCase()} - ${booking.service.title}`,
      body: `Hi ${booking.user.name},\nYour booking for "${booking.service.title}" is now ${status}.`
    });

    res.json(booking);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;