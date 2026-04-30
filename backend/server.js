// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');

// // Load env variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // ✅ MongoDB URI
// const MONGO_URI = process.env.MONGO_URI;

// if (!MONGO_URI) {
//   console.error("❌ MONGO_URI is not defined in environment variables");
//   process.exit(1);
// }

// // ✅ CORS setup
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
//       return callback(null, true);
//     }

//     if (origin.includes(".vercel.app")) {
//       return callback(null, true);
//     }

//     if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
//       return callback(null, true);
//     }

//     console.warn(`❌ CORS blocked request from: ${origin}`);
//     callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
// }));

// // ✅ Middleware
// app.use(express.json());

// // ✅ Health routes
// app.get('/', (req, res) => {
//   res.json({ message: '🚀 Compostify backend is running' });
// });

// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'ok',
//     database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//   });
// });

// // ✅ API Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/services', require('./routes/services'));
// app.use('/api/bookings', require('./routes/bookings'));
// app.use('/api/reviews', require('./routes/reviews'));
// app.use('/api/admin', require('./routes/admin'));

// // ✅ Seed Admin User
// async function seedAdmin() {
//   try {
//     const existingAdmin = await User.findOne({ email: 'admin@compostify.com' });
//     if (existingAdmin) return;

//     const hashedPassword = await bcrypt.hash('admin123', 10);

//     await new User({
//       name: 'System Admin',
//       email: 'admin@compostify.com',
//       password: hashedPassword,
//       role: 'admin',
//       isVerified: true
//     }).save();

//     console.log('✅ Admin seeded (admin@compostify.com / admin123)');
//   } catch (err) {
//     console.error('❌ Error seeding admin:', err.message);
//   }
// }

// // ✅ Start Server
// async function startServer() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log('✅ MongoDB connected');

//     await seedAdmin();

//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error('❌ Error starting server:', error.message);
//     process.exit(1);
//   }
// }

// // 🚀 Start app
// startServer();



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ MongoDB URI
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables");
  process.exit(1);
}

// ✅ SIMPLE & SAFE CORS (recommended)
app.use(cors({
  origin: true,
  credentials: true
}));

// ✅ Request timeout safety (debugging)
app.use((req, res, next) => {
  res.setTimeout(60000, () => {
    console.log("⏱️ Request timed out");
  });
  next();
});

// ✅ Middleware
app.use(express.json());

// ✅ Health routes
app.get('/', (req, res) => {
  res.json({ message: '🚀 Compostify backend is running' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ✅ API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/admin', require('./routes/admin'));

// ✅ Seed Admin User
async function seedAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@compostify.com' });
    if (existingAdmin) return;

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await new User({
      name: 'System Admin',
      email: 'admin@compostify.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    }).save();

    console.log('✅ Admin seeded (admin@compostify.com / admin123)');
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message);
  }
}

// ✅ Start Server
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    await seedAdmin();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error starting server:', error.message);
    process.exit(1);
  }
}

// 🚀 Start app
startServer();