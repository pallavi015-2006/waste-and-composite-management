♻️ Waste and Compost Management System

🌍 Project Overview

The Waste and Compost Management System is a full-stack web application designed to promote smart waste disposal and eco-friendly composting practices.

It allows users to:

1.Request waste collection services
2.Learn composting techniques
3.Track their activities

At the same time, admins can efficiently manage the entire system through a centralized dashboard.

🎯 Goal: Encourage sustainable living and reduce environmental pollution through technology.


🚀 Key Features

👤 User Module
🔐 Secure Registration & Login (Authentication)
🚛 Book Waste Collection Services
🌱 Explore Composting Services
📚 Learn Waste Management Techniques
📊 Personal Dashboard (Track bookings & activity)
⭐ Submit Reviews & Feedback
🛠 Admin Module
🔑 Admin Login Panel
👥 Manage Users
🧾 Manage Services
📦 Manage Bookings
⭐ Monitor Reviews
📊 Dashboard Overview


🏗️ Project Structure

waste-and-composite-management-main/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── services.html
│   ├── education.html
│   └── admin.html
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   ├── users.json
│   ├── bookings.json
│   ├── services.json
│   ├── reviews.json
│   └── .gitignore
│
├── README.md
├── CHANGES.md
└── GMAIL_SETUP.md


💻 Technologies Used

🌐 Frontend

HTML
CSS
JavaScript

⚙️ Backend

Node.js
Express.js

🗄️ Database / Storage

JSON-based file storage
Environment configuration using dotenv

🧰 Additional Tools

Nodemailer (Email Services)
CORS
dotenv


⚙️ How the System Works

1.User Registration
Users create an account using the registration page.
2.Login Authentication
Secure login using email and password.
3.Browse Services
Users explore available waste and composting services.
4.Book Services
Request waste pickup or composting services.
5.Dashboard Access
Track bookings, activities, and status.
6.Admin Management
Admin manages users, services, bookings, and reviews.


🛠 Installation & Setup Guide

1️⃣ Clone the Repository

git clone https://github.com/pallavi015-2006/waste-and-composite-management.git
cd waste-and-composite-management-main


2️⃣ Backend Setup

cd backend
npm install


3️⃣ Environment Configuration

Create a .env file inside the backend folder.

Example:
PORT=5001
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

⚠️ Important:

Never push .env file to GitHub
Use .env.example as reference


4️⃣ Run Backend Server
npm start
or
npm run dev


5️⃣ Run Frontend
Open frontend/index.html in browser
OR
Use Live Server (VS Code)


📂 Important Notes

❌ Do NOT upload node_modules/
❌ Do NOT upload .env
✅ Use .env.example for sharing config

Recommended .gitignore

node_modules
.env
.DS_Store


🌱 Future Improvements

💳 Payment Gateway Integration
🔔 Real-Time Notifications
🤖 AI-Based Waste Classification
📡 Smart IoT Waste Bin Integration
📱 Mobile Responsive Version
📊 Advanced Analytics Dashboard


🎯 Project Objective

This project aims to:

Promote eco-friendly waste management 🌿
Improve recycling habits ♻️
Encourage composting practices 🌱
Build awareness for sustainable living 🌍


👩‍💻 Developed By

Pahar Dwivedi
Pallavi Kumari
Riya Sharma
B.Tech CSE Students
Lovely Professional University


📄 License

This project is developed for educational and academic purposes only.
