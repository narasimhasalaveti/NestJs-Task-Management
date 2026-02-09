# Full Stack Task Management Application

Complete setup guide for NestJS Backend + React Frontend + MySQL Database

## 📁 Project Structure

```
nestjs-task-management/
├── src/                          # NestJS Backend
│   ├── auth/                     # Authentication module
│   ├── tasks/                    # Tasks module
│   ├── main.ts                   # Backend entry point
│   └── ...
├── client/                       # React Frontend
│   ├── src/
│   │   ├── api/                  # API integration
│   │   ├── components/           # React components
│   │   ├── App.tsx               # Main app component
│   │   └── main.tsx              # Frontend entry point
│   └── package.json
├── package.json                  # Backend dependencies
└── SETUP_GUIDE.md               # This file
```

## 🚀 Complete Setup Steps

### Step 1: Backend Setup (Already Complete ✓)

Your NestJS backend is configured with:

- MySQL database connection
- User authentication (JWT)
- Tasks CRUD operations
- CORS enabled for frontend communication

### Step 2: Install Frontend Dependencies

Open a terminal and navigate to the client folder:

```bash
cd client
yarn install
```

Or from the root directory:

```bash
yarn client:install
```

This will install:

- React 18
- TypeScript
- Vite (build tool)
- React Router (navigation)
- Axios (HTTP client)

### Step 3: Start the Backend Server

Open a **new terminal** in the root project directory:

```bash
yarn start:dev
```

The backend will run on: **http://localhost:3000**

You should see output like:

```
[Nest] Application successfully started
```

### Step 4: Start the Frontend Server

In the client directory terminal:

```bash
yarn dev
```

Or from the root directory:

```bash
yarn client:dev
```

The frontend will run on: **http://localhost:5173**

You should see output like:

```
VITE ready in XXX ms
➜ Local: http://localhost:5173/
```

### Step 5: Access the Application

Open your browser and go to: **http://localhost:5173**

## 🎯 Using the Application

### 1. Sign Up

- Click "Sign Up" on the auth page
- Enter username (4-20 characters)
- Enter password (8-32 characters)
- Click "Sign Up"

### 2. Sign In

- Enter your username and password
- Click "Sign In"
- You'll be redirected to the task dashboard

### 3. Create Tasks

- Click "Create New Task"
- Enter task title and description
- Click "Create Task"

### 4. Manage Tasks

- **Filter by Status**: Use the dropdown to filter tasks (Open, In Progress, Done)
- **Search**: Type in the search box to find tasks
- **Update Status**: Click "Move to [Status]" button on a task
- **Delete**: Click "Delete" button on a task

### 5. Logout

- Click "Logout" button in the navbar

## 🔧 API Endpoints (Backend)

### Authentication

- `POST /auth/signup` - Create new user
- `POST /auth/signin` - Login user

### Tasks (Requires JWT Token)

- `GET /tasks` - Get all tasks (with optional filters)
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PATCH /tasks/:id/status` - Update task status
- `DELETE /tasks/:id` - Delete task

## 📝 Environment Configuration

### Backend (.env file in root)

Make sure you have these environment variables:

```env
STAGE=dev
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=task_management
JWT_SECRET=your_jwt_secret_key
```

### Frontend (Configured in vite.config.ts)

The frontend is configured to:

- Run on port 5173
- Connect to backend at http://localhost:3000
  yarn start:dev # Start backend in watch mode
  yarn build # Build for production
  yarn start:prod # Run production build
  yarn test # Run tests
  yarn lint # Lint code

````

### Frontend (Client Directory)
```bash
yarn dev            # Start development server
yarn build          # Build for production
yar

### Frontend (Client Directory)
```bash
yarn dev               # Start development server
yarn build             # Build for production
yarn preview           # Preview production build
````

## 📦 Tech Stack

### Backend

- **NestJS** - Node.js framework
- **TypeORM** - ORM for MySQL
- **MySQL** - Database
- **Passport JWT** - Authentication
- **bcrypt** - Password hashing
- **class-validator** - Validation

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router v6** - Routing
- **Axios** - HTTP client

## 🔐 Security Features

1. **Password Hashing**: Passwords are hashed with bcrypt
2. **JWT Authentication**: Secure token-based auth
3. **Route Guards**: Protected routes require authentication
4. **Token Interceptor**: Auto-adds JWT to API requests
5. **401 Handling**: Auto-redirect to login on token expiry

## 📱 Features Implemented

### Authentication

- ✅ User signup with validation
- ✅ User signin with JWT
- ✅ Persistent login (localStorage)
- ✅ Logout functionality
- ✅ Protected routes

### Task Management

- ✅ Create tasks
- ✅ View all tasks
- ✅ Filter by status
- ✅ Search tasks
- ✅ Update task status (Open → In Progress → Done)
- ✅ Delete tasks
- ✅ User-specific tasks (users only see their own tasks)

## 🚨 Troubleshooting

### Backend Not Starting

1. Check MySQL is running
2. Verify database credentials in `.env`
3. Ensure database exists: `CREATE DATABASE task_management;`

### Frontend Not Connecting

1. Ensure backend is running on port 3000
2. Check CORS is enabled in `main.ts`
3. Clear browser cache and localStorage

### CORS Errors

- Already configured in backend `main.ts`
- If issues persist, try restarting backend

### Port Already in Use

```bash
# Change backend port
# In .env: PORT=3001

# Change frontend port
# In vite.config.ts: server: { port: 5174 }
```

## 🎨 Customization

### Change API URL

Edit `client/src/api/axios.ts`:

```typescript
baseURL: 'http://your-api-url';
```

### Change Frontend Port

Edit `client/vite.config.ts`:

```typescript
server: {
  port: 5173;
}
```

### Add New Features

1. Backend: Add new endpoints in controllers
2. Frontend: Create API methods in `client/src/api/`
3. Create React components in `client/src/components/`

## 📄 License

UNLICENSED

## 👥 Support

For issues or questions, check the console logs in:

- Backend: Terminal running `yarn start:dev`
- Frontend: Browser DevTools Console (F12)
