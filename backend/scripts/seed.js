
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Service = require('../models/Service');

dotenv.config();

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI not defined");
    }

    console.log(`Connecting to database...`);
    await mongoose.connect(mongoUri);

    // ✅ Prevent duplicate seeding
    const existingAdmin = await User.findOne({ email: 'admin@compostify.com' });
    if (existingAdmin) {
      console.log("⚠️ Data already seeded. Skipping...");
      await mongoose.disconnect();
      process.exit();
    }

    // ✅ Only clear in development
    if (process.env.NODE_ENV === 'development') {
      await User.deleteMany({});
      await Service.deleteMany({});
    }

    const salt = await bcrypt.genSalt(10);

    // Admin
    const admin = await new User({
      name: 'System Admin',
      email: 'admin@compostify.com',
      password: await bcrypt.hash('admin123', salt),
      role: 'admin',
      isVerified: true
    }).save();

    console.log('✅ Admin created');

    // Experts
    const expert1 = await new User({
      name: 'Priya Sharma',
      email: 'priya@compostify.com',
      password: await bcrypt.hash('expert123', salt),
      role: 'expert',
      isVerified: true
    }).save();

    const expert2 = await new User({
      name: 'Rohan Verma',
      email: 'rohan@compostify.com',
      password: await bcrypt.hash('expert123', salt),
      role: 'expert',
      isVerified: true
    }).save();

    const expert3 = await new User({
      name: 'Anita Desai',
      email: 'anita@compostify.com',
      password: await bcrypt.hash('expert123', salt),
      role: 'expert',
      isVerified: true
    }).save();

    console.log('✅ Experts created');

    // Services
    const services = [
      {
        provider: expert1._id,
        title: 'Home Composting Starter Kit & Setup',
        description: 'Complete home composting setup...',
        serviceType: 'home_composting',
        location: 'Delhi',
        price: 1500
      },
      {
        provider: expert2._id,
        title: 'Bulk Organic Waste Collection',
        description: 'Weekly bulk organic waste collection...',
        serviceType: 'bulk_waste',
        location: 'Mumbai',
        price: 3500
      }
      // (you can keep rest same)
    ];

    await Service.insertMany(services);

    console.log(`✅ ${services.length} services seeded`);

    await mongoose.disconnect();
    process.exit();

  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
