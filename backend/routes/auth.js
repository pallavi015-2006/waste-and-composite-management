// // const express = require('express');
// // const router = express.Router();
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/User');
// // const { sendEmail } = require('../utils/mailer');

// // // Generate a 6-digit OTP
// // function generateOTP() {
// //   return Math.floor(100000 + Math.random() * 900000).toString();
// // }

// // // POST /api/auth/register
// // router.post('/register', async (req, res) => {
// //   try {
// //     const { name, email, password, role } = req.body;

// //     let user = await User.findOne({ email });
// //     if (user) return res.status(400).json({ message: 'User already exists' });

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     user = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       role: role || 'user',
// //       isVerified: role === 'admin' ? true : false
// //     });

// //     await user.save();

// //     const payload = { user: { id: user.id, role: user.role } };

// //     jwt.sign(
// //       payload,
// //       process.env.JWT_SECRET || 'fallback_secret',
// //       { expiresIn: '5 days' },
// //       (err, token) => {
// //         if (err) throw err;
// //         res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
// //       }
// //     );
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // POST /api/auth/login
// // // Step 1: Validate credentials → send OTP
// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

// //     // Generate OTP and set 10-minute expiry
// //     const otp = generateOTP();
// //     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// //     user.otp = otp;
// //     user.otpExpiry = otpExpiry;
// //     user.otpVerified = false;
// //     await user.save();

// //     // Send OTP via simulated email
// //     await sendEmail({
// //       to: user.email,
// //       subject: 'Your Compostify Login OTP',
// //       body: `Hi ${user.name},\n\nYour one-time login code is: ${otp}\n\nThis code expires in 10 minutes.\n\nIf you did not request this, please ignore this email.\n\n— Compostify Team`
// //     });

// //     // Return userId so the OTP verify step knows which user
// //     res.json({
// //       message: 'OTP sent to your email. Please verify to complete login.',
// //       userId: user._id
// //     });
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // POST /api/auth/verify-otp
// // // Step 2: Verify OTP → issue JWT
// // router.post('/verify-otp', async (req, res) => {
// //   try {
// //     const { userId, otp } = req.body;

// //     const user = await User.findById(userId);
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     if (!user.otp || !user.otpExpiry) {
// //       return res.status(400).json({ message: 'No OTP requested. Please login first.' });
// //     }

// //     if (new Date() > user.otpExpiry) {
// //       user.otp = null;
// //       user.otpExpiry = null;
// //       await user.save();
// //       return res.status(400).json({ message: 'OTP has expired. Please login again.' });
// //     }

// //     if (user.otp !== otp) {
// //       return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
// //     }

// //     // OTP matched — clear it and mark verified
// //     user.otp = null;
// //     user.otpExpiry = null;
// //     user.otpVerified = true;
// //     await user.save();

// //     const payload = { user: { id: user.id, role: user.role } };

// //     jwt.sign(
// //       payload,
// //       process.env.JWT_SECRET || 'fallback_secret',
// //       { expiresIn: '5 days' },
// //       (err, token) => {
// //         if (err) throw err;
// //         res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
// //       }
// //     );
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // POST /api/auth/resend-otp
// // // Resend a fresh OTP for a pending login
// // router.post('/resend-otp', async (req, res) => {
// //   try {
// //     const { userId } = req.body;

// //     const user = await User.findById(userId);
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     const otp = generateOTP();
// //     user.otp = otp;
// //     user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
// //     user.otpVerified = false;
// //     await user.save();

// //     await sendEmail({
// //       to: user.email,
// //       subject: 'Your New Compostify Login OTP',
// //       body: `Hi ${user.name},\n\nYour new one-time login code is: ${otp}\n\nThis code expires in 10 minutes.\n\n— Compostify Team`
// //     });

// //     res.json({ message: 'New OTP sent to your email.' });
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // POST /api/auth/forgot-password
// // // Step 1: Send reset OTP to email
// // router.post('/forgot-password', async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(400).json({ message: 'User not found' });

// //     // Generate reset OTP
// //     const resetOtp = generateOTP();
// //     const resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// //     user.resetOtp = resetOtp;
// //     user.resetOtpExpiry = resetOtpExpiry;
// //     await user.save();

// //     // Send reset OTP
// //     await sendEmail({
// //       to: user.email,
// //       subject: 'Compostify Password Reset Code',
// //       body: `Hi ${user.name},\n\nYou requested to reset your password. Use this code to proceed:\n\n${resetOtp}\n\nThis code expires in 10 minutes.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n\n— Compostify Team`
// //     });

// //     res.json({
// //       message: 'Reset code sent to your email.',
// //       userId: user._id
// //     });
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // POST /api/auth/verify-reset-otp
// // // Step 2: Verify reset OTP
// // router.post('/verify-reset-otp', async (req, res) => {
// //   try {
// //     const { userId, otp } = req.body;

// //     const user = await User.findById(userId);
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     if (!user.resetOtp || !user.resetOtpExpiry) {
// //       return res.status(400).json({ message: 'No reset request found. Please try again.' });
// //     }

// //     if (new Date() > user.resetOtpExpiry) {
// //       user.resetOtp = null;
// //       user.resetOtpExpiry = null;
// //       await user.save();
// //       return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
// //     }

// //     if (user.resetOtp !== otp) {
// //       return res.status(400).json({ message: 'Invalid reset code. Please try again.' });
// //     }

// //     res.json({ message: 'Code verified. You can now reset your password.' });
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // POST /api/auth/reset-password
// // // Step 3: Reset password with new password
// // router.post('/reset-password', async (req, res) => {
// //   try {
// //     const { userId, newPassword } = req.body;

// //     const user = await User.findById(userId);
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     // Hash new password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(newPassword, salt);

// //     // Update password and clear reset tokens
// //     user.password = hashedPassword;
// //     user.resetOtp = null;
// //     user.resetOtpExpiry = null;
// //     await user.save();

// //     res.json({ message: 'Password reset successfully. You can now login with your new password.' });
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send('Server error');
// //   }
// // });

// // module.exports = router;






// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { sendEmail } = require('../utils/mailer');

// const express = require('express');
// const router = express.Router();
// const OTPModel = require('../models/OTP');

// // ✅ JWT secret (no fallback)
// const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined in environment variables");
// }

// // Generate a 6-digit OTP
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // ================= REGISTER =================
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const emailNormalized = email.toLowerCase().trim();

//     let user = await User.findOne({ email: emailNormalized });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({
//       name,
//       email: emailNormalized,
//       password: hashedPassword,
//       role: role || 'user',
//       isVerified: role === 'admin'
//     });

//     await user.save();

//     const payload = { user: { id: user.id, role: user.role } };

//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5d' });

//     res.json({
//       token,
//       user: { id: user.id, name: user.name, role: user.role }
//     });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ================= LOGIN (STEP 1) =================
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password required' });
//     }

//     const emailNormalized = email.toLowerCase().trim();

//     const user = await User.findOne({ email: emailNormalized }).select('+password');

//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate OTP
//     const otp = generateOTP();
//     user.otp = otp;
//     user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
//     user.otpVerified = false;
//     await user.save();

//     await sendEmail({
//       to: user.email,
//       subject: 'Your Compostify Login OTP',
//       body: `Hi ${user.name},\n\nYour OTP is: ${otp}\n\nValid for 10 minutes.\n\n— Compostify Team`
//     });

//     res.json({
//       message: 'OTP sent to your email',
//       userId: user._id
//     });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ================= VERIFY OTP =================
// router.post('/verify-otp', async (req, res) => {
//   try {
//     const { userId, otp } = req.body;

//     if (!userId || !otp) {
//       return res.status(400).json({ message: 'Invalid request' });
//     }

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (!user.otp || !user.otpExpiry) {
//       return res.status(400).json({ message: 'No OTP requested' });
//     }

//     if (new Date() > user.otpExpiry) {
//       user.otp = null;
//       user.otpExpiry = null;
//       await user.save();
//       return res.status(400).json({ message: 'OTP expired' });
//     }

//     if (user.otp !== otp) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     user.otp = null;
//     user.otpExpiry = null;
//     user.otpVerified = true;
//     await user.save();

//     const payload = { user: { id: user.id, role: user.role } };
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5d' });

//     res.json({
//       token,
//       user: { id: user.id, name: user.name, role: user.role }
//     });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ================= RESEND OTP =================
// router.post('/resend-otp', async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const otp = generateOTP();
//     user.otp = otp;
//     user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
//     user.otpVerified = false;
//     await user.save();

//     await sendEmail({
//       to: user.email,
//       subject: 'New OTP',
//       body: `Your new OTP is: ${otp}`
//     });

//     res.json({ message: 'New OTP sent' });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ================= FORGOT PASSWORD =================
// router.post('/forgot-password', async (req, res) => {
//   try {
//     const { email } = req.body;

//     const emailNormalized = email.toLowerCase().trim();
//     const user = await User.findOne({ email: emailNormalized });

//     if (!user) return res.status(400).json({ message: 'Invalid request' });

//     const resetOtp = generateOTP();
//     user.resetOtp = resetOtp;
//     user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
//     await user.save();

//     await sendEmail({
//       to: user.email,
//       subject: 'Password Reset Code',
//       body: `Your reset code is: ${resetOtp}`
//     });

//     res.json({
//       message: 'Reset code sent',
//       userId: user._id
//     });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ================= VERIFY RESET OTP =================
// router.post('/verify-reset-otp', async (req, res) => {
//   try {
//     const { userId, otp } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (!user.resetOtp || new Date() > user.resetOtpExpiry) {
//       return res.status(400).json({ message: 'Invalid or expired code' });
//     }

//     if (user.resetOtp !== otp) {
//       return res.status(400).json({ message: 'Invalid code' });
//     }

//     res.json({ message: 'OTP verified' });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ================= RESET PASSWORD =================
// router.post('/reset-password', async (req, res) => {
//   try {
//     const { userId, newPassword } = req.body;

//     if (!newPassword) {
//       return res.status(400).json({ message: 'Password required' });
//     }

//     const user = await User.findById(userId).select('+password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);

//     user.resetOtp = null;
//     user.resetOtpExpiry = null;

//     await user.save();

//     res.json({ message: 'Password reset successful' });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// // const express = require('express');
// // const router = express.Router();
// // const OTPModel = require('../models/OTP');

// // ✅ SEND OTP
// router.post('/send-otp', async (req, res) => {
//   const { email } = req.body;

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   await OTPModel.findOneAndUpdate(
//     { email },
//     { otp, expiresAt: Date.now() + 5 * 60 * 1000 },
//     { upsert: true }
//   );

//   console.log("OTP:", otp);

//   res.json({
//     message: "OTP sent successfully",
//     otp: otp // 👈 for popup
//   });
// });

// module.exports = router;

// module.exports = router;


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

// ================= LOGIN (STEP 1) =================
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const emailNormalized = email.toLowerCase().trim();

//     const user = await User.findOne({ email: emailNormalized }).select('+password');

//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // ✅ Generate OTP
//     // const otp = generateOTP();

//     // user.otp = otp;
//     // user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
//     // user.otpVerified = false;
//     // await user.save();

//     // ✅ Send email
//     await sendEmail({
//       to: user.email,
//       subject: 'Your Compostify OTP',
//       body: `Your OTP is: ${otp}`
//     });



//     const otp = generateOTP();

// // ✅ Assign OTP
// user.otp = otp;
// user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
// user.otpVerified = false;

// // 🔥 VERY IMPORTANT (this is missing in your code)
// await user.save();

// // Debug (optional)
// console.log("OTP saved:", otp);

//     // ✅ RETURN OTP (for popup demo)
//     res.json({
//       message: 'OTP sent',
//       userId: user._id,
//       otp: otp   // 🔥 IMPORTANT
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



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
