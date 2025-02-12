# Dashboard Web Application

This is a **full-stack dashboard application** built using **React.js, Node.js, Express.js, and MongoDB**. The application allows users to log in and view their details securely with JWT authentication.

## Features
- **User Authentication** (JWT-based Login & Protected Routes)
- **React Frontend with Tailwind CSS**
- **Node.js & Express Backend with MongoDB**
- **Secure API Calls with JWT Authorization**
- **User Data Display on Dashboard**

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JSON Web Token (JWT)

## Installation Guide

### 1. Clone the Repository
```sh
git clone https://github.com/K-S11145T/dashboard-app.git
cd dashboard-app
```

### 2. Install Dependencies
#### **Frontend Setup**
```sh
cd frontend
npm install
```
#### **Backend Setup**
```sh
cd backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file inside the `backend` directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the Application
#### **Start the Backend**
```sh
cd backend
npm run dev
```
#### **Start the Frontend**
```sh
cd frontend
npm start
```

### 5. Access the App
- Frontend will be running at: **`http://localhost:3000`**
- Backend API will be running at: **`http://localhost:5000`**

## API Endpoints
### **User Authentication**
- `POST /api/users/login` - Logs in a user and returns JWT token
- `GET /api/users/dashboard` - Fetches user data (protected route)

## Deployment
- **Frontend:** Hosted on Vercel
- **Backend:** Hosted on Render
- **Database:** MongoDB Atlas

## Future Improvements
- Role-based authentication
- More user profile features
- Dark mode UI

## License
This project is **MIT Licensed**.

---
### 📌 Developed by **Tanush Singh** 🚀

