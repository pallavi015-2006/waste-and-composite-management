<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=🌱%20EcoVerde&fontSize=70&fontColor=a3e635&animation=fadeIn&fontAlignY=35&desc=Waste%20%26%20Compost%20Management%20System&descAlignY=58&descSize=22&descColor=ffffff" width="100%"/>

<!-- BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-a3e635?style=for-the-badge&logo=statuspage&logoColor=black"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-4ade80?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-Academic-65a30d?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Made%20with-💚%20at%20LPU-a3e635?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/JSON-000000?style=flat-square&logo=json&logoColor=white"/>
</p>

<br/>

> ### *"Technology in service of the planet — one pickup at a time."*

<br/>

</div>

---

## 📌 Table of Contents

- [🌍 About the Project](#-about-the-project)
- [✨ Features at a Glance](#-features-at-a-glance)
- [🏗️ Project Structure](#️-project-structure)
- [💻 Tech Stack](#-tech-stack)
- [⚙️ How It Works](#️-how-it-works)
- [🚀 Installation & Setup](#-installation--setup)
- [🔐 Environment Variables](#-environment-variables)
- [📸 Pages Overview](#-pages-overview)
- [🌱 Future Roadmap](#-future-roadmap)
- [👩‍💻 Team](#-team)
- [📄 License](#-license)

---

## 🌍 About the Project

**Compostify — Waste & Compost Management System** is a full-stack web application built to promote **smart waste disposal** and **eco-friendly composting** practices across communities.

The platform bridges the gap between households generating waste and the services that can responsibly process it — making sustainable living **accessible, trackable, and rewarding**.

<table>
<tr>
<td>

**The Problem 😟**
- Millions of tonnes of organic waste end up in landfills every year
- Most households lack awareness of composting options
- No centralized platform exists to book eco-services easily
- Recycling rates remain critically low due to inconvenience

</td>
<td>

**Our Solution 💚**
- One platform for all waste management needs
- Instant service booking with tracked history
- Rich educational resources on composting
- Admin tools to scale and manage the ecosystem

</td>
</tr>
</table>

---

## ✨ Features at a Glance

### 👤 User Module

| Feature | Description |
|---|---|
| 🔐 **Auth System** | Secure register & login with JWT authentication |
| 🚛 **Book Pickups** | Schedule waste collection at your convenience |
| 🌱 **Composting Services** | Browse and book composting setups by experts |
| 📚 **Learn Hub** | Guides, tips, and techniques for sustainable living |
| 📊 **Personal Dashboard** | Track all bookings, activity & eco-impact stats |
| ⭐ **Reviews & Feedback** | Rate services and share experiences |

### 🛠️ Admin Module

| Feature | Description |
|---|---|
| 🔑 **Admin Login** | Separate secured admin panel |
| 👥 **User Management** | View, manage and monitor all registered users |
| 🧾 **Service Management** | Add, edit and remove available services |
| 📦 **Booking Management** | Track and update all booking statuses |
| ⭐ **Review Monitoring** | Moderate and analyze user feedback |
| 📊 **Admin Dashboard** | Bird's-eye view of the entire platform |

---

## 🏗️ Project Structure

```
waste-and-composite-management-main/
│
├── 📁 frontend/
│   ├── 🌐 index.html          ← Landing page
│   ├── 🔐 login.html          ← Login & Register
│   ├── 📝 register.html       ← Registration page
│   ├── 📊 dashboard.html      ← User dashboard
│   ├── 🧾 services.html       ← Services listing
│   ├── 📚 education.html      ← Learn composting
│   └── 🛠️ admin.html          ← Admin panel
│
├── 📁 backend/
│   ├── 🚀 server.js           ← Main Express server
│   ├── 📦 package.json        ← Dependencies
│   ├── 🔒 .env.example        ← Environment template
│   ├── 👤 users.json          ← User data store
│   ├── 📅 bookings.json       ← Bookings data store
│   ├── 🧾 services.json       ← Services data store
│   └── ⭐ reviews.json        ← Reviews data store
│
├── 📄 README.md
├── 📄 CHANGES.md
└── 📄 GMAIL_SETUP.md
```

---

## 💻 Tech Stack

<table>
<tr>
<th>Layer</th>
<th>Technology</th>
<th>Purpose</th>
</tr>
<tr>
<td>🌐 Frontend</td>
<td>HTML5, CSS3, JavaScript</td>
<td>UI, animations, interactivity</td>
</tr>
<tr>
<td>⚙️ Backend</td>
<td>Node.js + Express.js</td>
<td>REST API, routing, business logic</td>
</tr>
<tr>
<td>🗄️ Storage</td>
<td>JSON file-based storage</td>
<td>Lightweight data persistence</td>
</tr>
<tr>
<td>🔐 Auth</td>
<td>JWT (JSON Web Tokens)</td>
<td>Secure user sessions</td>
</tr>
<tr>
<td>📧 Email</td>
<td>Nodemailer</td>
<td>Notifications & confirmations</td>
</tr>
<tr>
<td>🔧 Config</td>
<td>dotenv</td>
<td>Secure environment management</td>
</tr>
<tr>
<td>🔗 API</td>
<td>CORS</td>
<td>Cross-origin request handling</td>
</tr>
</table>

---

## ⚙️ How It Works

```
 ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
 │   Register  │────▶│    Login    │────▶│  Browse &   │────▶│  Dashboard  │
 │  / Sign Up  │     │    Auth     │     │  Book Svc   │     │   & Track   │
 └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    Admin    │
                    │  Dashboard  │
                    │ (Manage All)│
                    └─────────────┘
```

1. **User registers** via the registration form with name, email & password
2. **Secure login** issues a JWT token for the session
3. **Browse services** — waste pickup, composting, consulting & more
4. **Book a service** — choose date, time and confirm booking instantly
5. **Track via dashboard** — see all bookings, statuses, and eco-impact
6. **Admin oversees** all users, bookings, services and reviews centrally

---

## 🚀 Installation & Setup

### Prerequisites

Make sure you have the following installed:

```bash
node --version   # v16 or higher
npm --version    # v8 or higher
```

### Step 1 — Clone the Repository

```bash
git clone https://github.com/pallavi015-2006/waste-and-composite-management.git
cd waste-and-composite-management-main
```

### Step 2 — Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3 — Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Open .env and fill in your values
nano .env
```

### Step 4 — Start the Backend Server

```bash
# Standard start
npm start

# Development mode (auto-restarts on changes)
npm run dev
```

> ✅ Server runs on **http://localhost:5001**

### Step 5 — Launch the Frontend

```bash
# Option A: Simply open in browser
open frontend/index.html

# Option B: Use VS Code Live Server (recommended)
# Right-click index.html → "Open with Live Server"
```

> ✅ Frontend runs on **http://127.0.0.1:5500**

---

## 🔐 Environment Variables

Create a `.env` file inside the `/backend` folder:

```env
# Server
PORT=5001

# Security
JWT_SECRET=your_super_secret_key_here

# Email (Nodemailer — use Gmail App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `5001` |
| `JWT_SECRET` | Secret key for signing tokens | `mysecretkey123` |
| `EMAIL_USER` | Gmail address for sending emails | `hello@gmail.com` |
| `EMAIL_PASS` | Gmail **App Password** (not your login password) | `abcd efgh ijkl mnop` |

> ⚠️ **Never push your `.env` file to GitHub.** Use `.env.example` as a safe template to share.

---

## 📸 Pages Overview

| Page | Route | Description |
|---|---|---|
| 🏠 Home | `index.html` | Landing page with hero, stats, features |
| 🔐 Login | `login.html` | User login & registration |
| 📊 Dashboard | `dashboard.html` | Personal eco-dashboard & booking history |
| 🧾 Services | `services.html` | Browse & book all eco services |
| 📚 Education | `education.html` | Composting guides & learning resources |
| 🛠️ Admin | `admin.html` | Full admin management panel |

---

## 🌱 Future Roadmap

```
Phase 1 (Current) ✅
├── User Auth & JWT
├── Service Booking
├── Educational Content
├── Admin Dashboard
└── Review System

Phase 2 (Planned) 🔄
├── 💳 Payment Gateway Integration (Razorpay)
├── 🔔 Real-Time Notifications (Socket.io)
└── 📱 Mobile Responsive Redesign

Phase 3 (Future) 🌟
├── 🤖 AI-Based Waste Classification (TensorFlow.js)
├── 📡 Smart IoT Waste Bin Integration
├── 📊 Advanced Analytics & Reports
└── 🗺️ GPS-Based Pickup Tracking
```

---

## 👩‍💻 Team

<div align="center">

| 👤 Name | 🏫 Institution |
|---|---|
| **Pahar Dwivedi** | Lovely Professional University |
| **Pallavi Kumari** | Lovely Professional University |
| **Riya Sharma** | Lovely Professional University |

*B.Tech CSE Students — Building tech for a greener tomorrow 🌍*

</div>

---

## 📄 License

```
This project is developed for educational and academic purposes only.
© 2024 EcoVerde Team — Lovely Professional University

Redistribution or commercial use without permission is not permitted.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer&animation=fadeIn" width="100%"/>

**Made with 💚 by the Compostify Team at LPU**

*If this project helped you, please give it a ⭐ on GitHub!*

</div>
