
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  title: { type: String, required: true, trim: true },

  description: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 10
  },

  serviceType: { 
    type: String, 
    enum: [
      'home_composting',
      'bulk_waste',
      'pickup',
      'consultation',
      'vermicomposting',
      'community_composting',
      'garden_soil_supply',
      'compost_bin_rental',
      'workshop_training',
      'waste_audit'
    ], 
    required: true 
  },

  location: { type: String, required: true, trim: true },

  price: { 
    type: Number, 
    required: true,
    min: 0 
  },

  rating: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5
  },

  reviewCount: { type: Number, default: 0 }

}, { timestamps: true });

// ✅ Indexes for performance
ServiceSchema.index({ provider: 1 });
ServiceSchema.index({ serviceType: 1 });
ServiceSchema.index({ location: 1 });

module.exports = mongoose.model('Service', ServiceSchema);