// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['user', 'expert', 'admin'], default: 'user' },
//   isVerified: { type: Boolean, default: false }, // Experts require verification

//   // OTP Login Verification
//   otp: { type: String, default: null },
//   otpExpiry: { type: Date, default: null },
//   otpVerified: { type: Boolean, default: false },

//   // Password Reset OTP
//   resetOtp: { type: String, default: null },
//   resetOtpExpiry: { type: Date, default: null },

//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('User', UserSchema);




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
    select: false 
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

  // OTP Login
  otp: { type: String, default: null, select: false },
  otpExpiry: { type: Date, default: null },
  otpVerified: { type: Boolean, default: false },

  // Password Reset
  resetOtp: { type: String, default: null, select: false },
  resetOtpExpiry: { type: Date, default: null }

}, { timestamps: true });

// ✅ Index
UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);