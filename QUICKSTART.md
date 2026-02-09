# ⚡ Quick Start Guide

## 🎯 Follow These Steps to Run Your Full-Stack App

### Step 1: Install Frontend Dependencies

```powershell
cd client
yarn install
cd ..
```

**Or use the shortcut from root:**

```powershell
yarn client:install
```

**What this does:** Installs all React dependencies in the client folder

**Note:** This will also resolve all TypeScript/ESLint errors you see in VS Code!

---

### Step 2: Start Backend Server (First Terminal)

```powershell
yarn start:dev
```

**What this does:**

- Starts NestJS backend on http://localhost:3000
- Connects to MySQL database
- Enables hot-reload for development

**Expected output:**

```
[Nest] Application successfully started
```

✅ **Keep this terminal running!**

---

### Step 3: Start Frontend Server (Second Terminal)

Open a **NEW terminal** and run:

```powershell
yarn client:dev
```

**What this does:**

- Starts React frontend on http://localhost:5173
- Enables hot-reload for development

**Expected output:**

```
VITE ready in XXX ms
➜ Local: http://localhost:5173/
```

✅ **Keep this terminal running too!**

---

### Step 4: Open Your Browser

Go to: **http://localhost:5173**

You should see the Task Management login page! 🎉

---

## 🎮 First Time Use

1. **Sign Up**
   - Click "Sign Up"
   - Enter username (min 4 characters)
   - Enter password (min 8 characters)

2. **Sign In**
   - Use your credentials to login
   - You'll be redirected to the task dashboard

3. **Create Your First Task**
   - Click "Create New Task"
   - Fill in title and description
   - Start managing your tasks!

---

## 📂 Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    YOUR BROWSER                         │
│              http://localhost:5173                      │
│                                                         │
│   ┌──────────────────────────────────────────┐        │
│   │        React Frontend (Vite)             │        │
│   │  - User Interface                        │        │
│   │  - Authentication Forms                  │        │
│   │  - Task Dashboard                        │        │
│   └──────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────┘
                         │
                         │ HTTP Requests (Axios)
                         │ JWT Token Auth
                         ▼
┌─────────────────────────────────────────────────────────┐
│              NestJS Backend API                         │
│            http://localhost:3000                        │
│                                                         │
│   ┌──────────────────────────────────────────┐        │
│   │  Auth Module     │   Tasks Module        │        │
│   │  - Signup        │   - Create Tasks      │        │
│   │  - Signin        │   - Get Tasks         │        │
│   │  - JWT Tokens    │   - Update Status     │        │
│   │                  │   - Delete Tasks      │        │
│   └──────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────┘
                         │
                         │ TypeORM
                         ▼
┌─────────────────────────────────────────────────────────┐
│              MySQL Database                             │
│            localhost:3306                               │
│                                                         │
│   ┌──────────────┐         ┌──────────────┐          │
│   │  users       │         │   tasks      │          │
│   │  - id        │         │   - id       │          │
│   │  - username  │         │   - title    │          │
│   │  - password  │◄────────│   - userId   │          │
│   └──────────────┘         │   - status   │          │
│                            └──────────────┘          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 API Endpoints Available

### Authentication (Public)

- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login user (returns JWT token)

### Tasks (Protected - Requires JWT)

- `GET /tasks` - Get all user's tasks
- `GET /tasks?status=OPEN` - Filter tasks by status
- `GET /tasks?search=keyword` - Search tasks
- `GET /tasks/:id` - Get specific task
- `POST /tasks` - Create new task
- `PATCH /tasks/:id/status` - Update task status
- `DELETE /tasks/:id` - Delete task

---

## 🛑 Stopping the Application

### Stop Backend:

In the backend terminal, press: `Ctrl + C`

### Stop Frontend:

In the frontend terminal, press: `Ctrl + C`

---

## 🔄 Restarting

Just run the start commands again:

**Terminal 1:**

```powershell
yarn start:dev
```

**Terminal 2:**

```powershell
yarn client:dev
```

---

## 📱 Features You Can Test

### ✅ Authentication

- [ ] Sign up with new credentials
- [ ] Sign in with existing credentials
- [ ] Auto-redirect to tasks on successful login
- [ ] Logout functionality
- [ ] Protected routes (try accessing /tasks while logged out)

### ✅ Task Management

- [ ] Create a new task
- [ ] View all your tasks
- [ ] Filter tasks by status (Open, In Progress, Done)
- [ ] Search for tasks by keyword
- [ ] Update task status (Open → In Progress → Done)
- [ ] Delete a task

---

## ⚠️ Troubleshooting

### Backend won't start?

```powershell
# Check if MySQL is running
# Verify .env file has correct database credentials
# Ensure database exists: CREATE DATABASE task_management;
```

### Frontend won't start?

```powershell
# Make sure you ran: yarn client:install
# Check if port 5173 is available
# Try deleting client/node_modules and reinstalling
```

### Can't login?

```powershell
# Make sure backend is running (check terminal 1)
# Check browser console (F12) for errors
# Verify username length >= 4 and password length >= 8
```

### CORS errors?

```powershell
# Backend is already configured for CORS
# Make sure backend is running on port 3000
# Restart backend if needed
```

---

## 📚 Next Steps

Want to customize? Check out:

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete documentation
- [client/README.md](./client/README.md) - Frontend details
- Add your own features!

---

## 🎓 Tech Stack Summary

**Backend:**

- NestJS (Node.js Framework)
- TypeORM (Database ORM)
- MySQL (Database)
- JWT (Authentication)
- Passport (Auth Strategy)

**Frontend:**

- React 18 (UI Library)
- TypeScript (Type Safety)
- Vite (Build Tool)
- React Router v6 (Navigation)
- Axios (HTTP Client)

---

## 🎉 Congratulations!

You now have a fully functional full-stack application with:

- ✅ User authentication
- ✅ Task management
- ✅ MySQL database
- ✅ RESTful API
- ✅ Modern React UI

Happy coding! 🚀
