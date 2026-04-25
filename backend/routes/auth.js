
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEmail } = require('../utils/mailer');

// ✅ JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not defined");
}

// ================= HELPER =================
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ================= REGISTER =================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const emailNormalized = email.toLowerCase().trim();

    let user = await User.findOne({ email: emailNormalized });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email: emailNormalized,
      password: hashedPassword,
      role: role || 'user',
      isVerified: role === 'admin'
    });

    await user.save();

    const token = jwt.sign(
      { user: { id: user.id, role: user.role } },
      JWT_SECRET,
      { expiresIn: '5d' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});







router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailNormalized = email.toLowerCase().trim();

    const user = await User.findOne({ email: emailNormalized }).select('+password');

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // ✅ 1. Generate OTP FIRST
    const otp = generateOTP();

    // ✅ 2. Save OTP in DB
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.otpVerified = false;

    await user.save();   // 🔥 MUST

    console.log("OTP saved:", otp);

    // ✅ 3. Send Email AFTER saving
    await sendEmail({
      to: user.email,
      subject: 'Your Compostify OTP',
      body: `Your OTP is: ${otp}`
    });

    // ✅ 4. Send response
    res.json({
      message: 'OTP sent',
      userId: user._id,
      otp: otp   // for popup demo
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================= VERIFY OTP =================
router.post('/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: 'No OTP requested' });
    }

    if (new Date() > user.otpExpiry) {
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.otp = null;
    user.otpExpiry = null;
    user.otpVerified = true;
    await user.save();

    const token = jwt.sign(
      { user: { id: user.id, role: user.role } },
      JWT_SECRET,
      { expiresIn: '5d' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================= RESEND OTP =================
router.post('/resend-otp', async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'New OTP',
      body: `Your new OTP is: ${otp}`
    });

    res.json({
      message: 'New OTP sent',
      otp: otp   // optional for popup
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================= FORGOT PASSWORD =================
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid request' });

    const resetOtp = generateOTP();

    user.resetOtp = resetOtp;
    user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Reset Code',
      body: `Your reset code is: ${resetOtp}`
    });

    res.json({
      message: 'Reset code sent',
      userId: user._id,
      otp: resetOtp   // optional
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================= RESET PASSWORD =================
router.post('/reset-password', async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = null;
    user.resetOtpExpiry = null;

    await user.save();

    res.json({ message: 'Password reset successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
