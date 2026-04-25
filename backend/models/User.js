
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },

  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
  },

  password: { 
    type: String, 
    required: true,
    select: false   // keep this hidden (correct)
  },

  role: { 
    type: String, 
    enum: ['user', 'expert', 'admin'], 
    default: 'user' 
  },

  isVerified: { 
    type: Boolean, 
    default: false 
  },

  // ✅ OTP Login (FIXED)
  otp: { 
    type: String, 
    default: null   // ❌ removed select: false
  },

  otpExpiry: { 
    type: Date, 
    default: null 
  },

  otpVerified: { 
    type: Boolean, 
    default: false 
  },

  // ✅ Password Reset (also fixed)
  resetOtp: { 
    type: String, 
    default: null   // ❌ removed select: false
  },

  resetOtpExpiry: { 
    type: Date, 
    default: null 
  }

}, { timestamps: true });

// ✅ Index
UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);