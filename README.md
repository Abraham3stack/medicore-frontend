# 🏥 Medicore Frontend

Medicore is a full-stack healthcare appointment booking platform that allows patients to book appointments with doctors, while admins manage users and doctors manage their schedules.

---

## 🚀 Live Demo

Frontend (Vercel): https://medicore-frontend-omega.vercel.app  
Backend (Render): https://medicore-backend-91ei.onrender.com

---

## ✨ Features

### 👤 Authentication
- Register & Login (JWT-based)
- Auto login after registration
- Role-based access (Admin, Doctor, Patient)

### 🧑‍⚕️ Patient
- Book appointments
- View appointments
- Responsive dashboard

### 🩺 Doctor
- View assigned appointments
- Mark appointments as completed

### 👑 Admin
- View all appointments
- Manage users
- Promote users to Doctor/Admin

### 📊 Dashboard
- Real-time stats (Patients, Doctors, Appointments)
- Animated counters
- Auto-refresh every 10 seconds

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Axios / Fetch API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## ⚙️ Environment Variables

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
NODE_ENV=production
```

---

## 📦 Installation

### 1. Clone the repo
```
git clone https://github.com/YOUR_USERNAME/medicore-frontend.git
cd medicore-frontend
```

### 2. Install dependencies
```
npm install
```

### 3. Run locally
```
npm run dev
```

---

## 🔐 Important Notes

- All users register as **patients by default**
- Admin can promote users to doctors
- Doctor profiles are auto-created when role changes

---

## 🧠 Future Improvements

- Doctor profile editing
- Search & filter users
- Notifications (toast system)
- Payment integration

---

## 👨‍💻 Author

Abraham Ogbu  
Full-stack Developer

---

## ⭐ If you like this project

Give it a star on GitHub ⭐
