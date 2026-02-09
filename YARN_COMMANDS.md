# 🧶 Yarn Commands Reference

Since you're using **Yarn** for your project, here are all the commands you need:

## 🚀 Quick Start (3 Steps)

### Step 1: Install Frontend Dependencies

```powershell
# Option 1: From root directory
yarn client:install

# Option 2: Navigate to client folder
cd client
yarn install
cd ..
```

### Step 2: Start Backend (Terminal 1)

```powershell
yarn start:dev
```

✅ Backend runs on: **http://localhost:3000**

### Step 3: Start Frontend (Terminal 2 - New Terminal)

```powershell
# Option 1: From root directory
yarn client:dev

# Option 2: Navigate to client folder
cd client
yarn dev
```

✅ Frontend runs on: **http://localhost:5173**

---

## 📦 Backend Commands (Root Directory)

### Development

```powershell
yarn start:dev          # Start backend in development mode with hot reload
yarn start:debug        # Start in debug mode
yarn start:prod         # Start in production mode
```

### Build & Test

```powershell
yarn build              # Build the application
yarn test               # Run unit tests
yarn test:watch         # Run tests in watch mode
yarn test:cov           # Run tests with coverage
yarn test:e2e           # Run end-to-end tests
```

### Code Quality

```powershell
yarn lint               # Run ESLint and auto-fix issues
yarn format             # Format code with Prettier
```

---

## 🎨 Frontend Commands

### From Root Directory

```powershell
yarn client:install     # Install frontend dependencies
yarn client:dev         # Start frontend dev server
yarn client:build       # Build frontend for production
```

### From Client Directory

```powershell
cd client

# Development
yarn dev                # Start dev server (port 5173)
yarn preview            # Preview production build

# Build
yarn build              # Build for production

# Code Quality
yarn lint               # Run ESLint
yarn lint:fix           # Auto-fix ESLint errors
yarn format             # Format code with Prettier
yarn format:check       # Check code formatting
```

---

## 🔄 Complete Workflow

### First Time Setup

```powershell
# 1. Install backend dependencies (if not already done)
yarn install

# 2. Install frontend dependencies
yarn client:install

# 3. Make sure MySQL is running and .env files are configured
```

### Daily Development

```powershell
# Terminal 1: Start Backend
yarn start:dev

# Terminal 2: Start Frontend
yarn client:dev

# Open browser: http://localhost:5173
```

### Before Committing Code

```powershell
# Backend
yarn lint
yarn format
yarn test

# Frontend (from client directory)
cd client
yarn lint:fix
yarn format
cd ..
```

---

## 📋 Common Tasks

### Adding New Dependencies

**Backend:**

```powershell
# Production dependency
yarn add package-name

# Development dependency
yarn add -D package-name
```

**Frontend:**

```powershell
cd client

# Production dependency
yarn add package-name

# Development dependency
yarn add -D package-name
```

### Rebuild Everything

```powershell
# Backend
yarn build

# Frontend
yarn client:build
```

### Clean Install (if you have issues)

```powershell
# Backend
rm -rf node_modules
yarn install

# Frontend
cd client
rm -rf node_modules
yarn install
```

---

## 🎯 Quick Reference Table

| Task                 | Command                      |
| -------------------- | ---------------------------- |
| **Backend Dev**      | `yarn start:dev`             |
| **Frontend Dev**     | `yarn client:dev`            |
| **Install Frontend** | `yarn client:install`        |
| **Backend Tests**    | `yarn test`                  |
| **Backend Lint**     | `yarn lint`                  |
| **Frontend Lint**    | `cd client && yarn lint:fix` |
| **Build Backend**    | `yarn build`                 |
| **Build Frontend**   | `yarn client:build`          |

---

## 💡 Pro Tips

### 1. Run Both Servers at Once (PowerShell)

```powershell
# Start backend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "yarn start:dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 5

# Start frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "yarn client:dev"
```

### 2. Check if Everything is Working

```powershell
# Backend health check
curl http://localhost:3000/auth/signup

# Frontend health check
curl http://localhost:5173
```

### 3. Stop All Servers

- Press `Ctrl + C` in each terminal
- Or close the PowerShell windows

---

## 🆚 Yarn vs NPM Command Comparison

| NPM                              | Yarn                          |
| -------------------------------- | ----------------------------- |
| `npm install`                    | `yarn install` or just `yarn` |
| `npm install package`            | `yarn add package`            |
| `npm install --save-dev package` | `yarn add -D package`         |
| `npm uninstall package`          | `yarn remove package`         |
| `npm run script`                 | `yarn script`                 |
| `npm test`                       | `yarn test`                   |
| `npm run build`                  | `yarn build`                  |

---

## ✅ What You Need to Do NOW

Since all code errors are fixed, just install dependencies:

```powershell
# Install frontend dependencies
yarn client:install
```

Then start both servers:

```powershell
# Terminal 1
yarn start:dev

# Terminal 2 (new terminal)
yarn client:dev
```

That's it! Open **http://localhost:5173** in your browser! 🎉

---

## 📞 Troubleshooting

### "yarn: command not found"

```powershell
# Install Yarn globally
npm install -g yarn

# Verify installation
yarn --version
```

### Port Already in Use

```powershell
# Backend (port 3000)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Frontend (port 5173)
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Frontend Dependencies Won't Install

```powershell
cd client
rm -rf node_modules yarn.lock
yarn install
```

---

**You're using Yarn! All commands above use `yarn` instead of `npm`.** 🧶✨
