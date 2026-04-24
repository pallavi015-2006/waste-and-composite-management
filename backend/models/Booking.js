// const mongoose = require('mongoose');

// const BookingSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   status: { type: String, enum: ['pending', 'accepted', 'completed', 'cancelled'], default: 'pending' },
//   scheduledDate: { type: Date, required: true },
//   notes: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Booking', BookingSchema);

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'completed', 'cancelled'], 
    default: 'pending' 
  },

  scheduledDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function (value) {
        return value > new Date();
      },
      message: "Scheduled date must be in the future"
    }
  },

  notes: { type: String, trim: true }

}, { timestamps: true });

// ✅ Indexes for performance
BookingSchema.index({ user: 1 });
BookingSchema.index({ provider: 1 });
BookingSchema.index({ service: 1 });

module.exports = mongoose.model('Booking', BookingSchema);