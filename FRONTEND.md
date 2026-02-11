# React Task Management - Frontend Documentation

Complete documentation for the React + TypeScript frontend application with JWT authentication, task management, and modern UI.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Architecture](#architecture)
- [Components](#components)
- [API Integration](#api-integration)
- [Authentication Flow](#authentication-flow)
- [Routing](#routing)
- [State Management](#state-management)
- [Styling](#styling)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)

---

## Overview

This is a modern React single-page application (SPA) built with TypeScript and Vite. It provides a complete task management interface with user authentication, CRUD operations, filtering, and search capabilities. The application communicates with a NestJS backend API using JWT tokens for secure authentication.

### Key Features

- **User Authentication**: Sign up and sign in with JWT tokens
- **Task Dashboard**: Complete task management interface
- **CRUD Operations**: Create, read, update, and delete tasks
- **Filtering**: Filter tasks by status (Open, In Progress, Done)
- **Search**: Real-time search across task titles and descriptions
- **Protected Routes**: Automatic redirection based on auth state
- **Persistent Login**: Token storage in localStorage
- **Responsive Design**: Clean, modern UI that works on all devices

---

## Tech Stack

### Core Framework

- **React 18.2.0** - UI library with Hooks
- **TypeScript 5.3.3** - Type-safe JavaScript
- **Vite 5.0.12** - Next-generation frontend build tool

### Routing & Navigation

- **React Router DOM 6.21.3** - Client-side routing
- **BrowserRouter** - HTML5 history API routing
- **Navigate** - Programmatic navigation

### HTTP Client

- **Axios 1.6.5** - Promise-based HTTP client
- **Interceptors** - Request/response transformation
- **JWT Integration** - Automatic token attachment

### Development Tools

- **@vitejs/plugin-react 4.2.1** - Vite React plugin
- **ESLint 9.0.0** - Code linting
- **Prettier 3.2.5** - Code formatting
- **TypeScript ESLint 8.0.0** - TypeScript linting

---

## Project Structure

```
client/
├── src/
│   ├── main.tsx                     # Application entry point
│   ├── App.tsx                      # Root component with routing
│   ├── index.css                    # Global styles
│   │
│   ├── api/                         # API Integration Layer
│   │   ├── axios.ts                 # Axios instance with interceptors
│   │   ├── auth.ts                  # Authentication API calls
│   │   └── tasks.ts                 # Tasks API calls
│   │
│   └── components/                  # React Components
│       ├── Auth.tsx                 # Login/Signup component
│       ├── Auth.css                 # Auth component styles
│       ├── TaskDashboard.tsx        # Main dashboard
│       ├── TaskDashboard.css        # Dashboard styles
│       ├── TaskCard.tsx             # Individual task card
│       ├── TaskCard.css             # Task card styles
│       ├── TaskForm.tsx             # Create task form
│       └── TaskForm.css             # Task form styles
│
├── index.html                       # HTML template
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript config (app)
├── tsconfig.node.json               # TypeScript config (Node)
├── eslint.config.js                 # ESLint configuration
├── .prettierrc                      # Prettier configuration
└── package.json                     # Dependencies and scripts
```

---

## Features

### 1. User Authentication

- **Sign Up**: Create new account with validation
- **Sign In**: Login with username and password
- **JWT Tokens**: Secure token-based authentication
- **Persistent Login**: Tokens stored in localStorage
- **Auto-Logout**: Automatic logout on 401 responses
- **Protected Routes**: Redirect unauthenticated users

### 2. Task Management

- **Create Tasks**: Add new tasks with title and description
- **View Tasks**: Display all user's tasks in a grid
- **Update Status**: Change task status with one click
- **Delete Tasks**: Remove tasks with confirmation
- **Status Progression**: Open → In Progress → Done workflow

### 3. Filtering & Search

- **Status Filter**: Filter by Open, In Progress, or Done
- **Search**: Real-time search across titles and descriptions
- **Combined Filters**: Search and status filter work together
- **Clear Filters**: Easy reset to view all tasks

### 4. User Interface

- **Modern Design**: Clean, professional interface
- **Color-Coded Status**: Visual status badges
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Loading States**: User feedback during API calls
- **Error Messages**: Clear error display
- **Success Feedback**: Confirmation of actions

### 5. Navigation

- **React Router**: Client-side routing
- **Protected Routes**: Authentication-based access
- **Auto-Redirect**: Intelligent navigation based on auth state
- **Logout**: Clear session and return to login

---

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Backend API running on http://localhost:3000

### Step 1: Navigate to Client Directory

```bash
cd client
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
yarn install
```

This installs:

- React and React DOM
- TypeScript
- Vite build tool
- React Router
- Axios
- ESLint and Prettier
- All type definitions

### Step 3: Verify Backend is Running

Ensure the NestJS backend is running on port 3000:

```bash
# In backend directory
yarn start:dev
```

### Step 4: Start Development Server

```bash
# Start Vite dev server
yarn dev
```

Frontend will run on: **http://localhost:5173**

### Step 5: Open Browser

Navigate to: **http://localhost:5173**

You should see the authentication page!

---

## Architecture

### Application Flow

```
┌─────────────────────────────────────────────────────────┐
│                     Browser                             │
│                http://localhost:5173                    │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   main.tsx                              │
│              (Application Entry)                        │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    App.tsx                              │
│         (Router, Auth State, Route Guards)              │
└─────────────────────────────────────────────────────────┘
                         │
                ┌────────┴────────┐
                │                 │
                ▼                 ▼
    ┌──────────────────┐  ┌──────────────────┐
    │   Auth.tsx       │  │ TaskDashboard    │
    │ (Login/Signup)   │  │   (Main View)    │
    └──────────────────┘  └──────────────────┘
                                   │
                          ┌────────┴────────┐
                          │                 │
                          ▼                 ▼
                  ┌──────────────┐  ┌──────────────┐
                  │  TaskForm    │  │  TaskCard    │
                  │  (Create)    │  │  (Display)   │
                  └──────────────┘  └──────────────┘
                          │                 │
                          └────────┬────────┘
                                   ▼
                        ┌────────────────────┐
                        │   API Layer        │
                        │ (axios, auth, tasks)│
                        └────────────────────┘
                                   │
                                   ▼
                        ┌────────────────────┐
                        │  Backend API       │
                        │  (NestJS)          │
                        └────────────────────┘
```

### Data Flow

1. **User Action**: User interacts with component
2. **API Call**: Component calls API function
3. **HTTP Request**: Axios sends request with JWT token
4. **Backend Processing**: NestJS processes request
5. **Response**: Backend returns data
6. **State Update**: Component updates local state
7. **UI Update**: React re-renders with new data

---

## Components

### 1. App.tsx - Root Component

**Purpose**: Application root with routing and auth state management

**Key Features**:

- React Router setup
- Authentication state management
- Protected route logic
- Login/logout handlers
- Route guards

**Code Overview**:

```typescript
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('accessToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={...} />
        <Route path="/tasks" element={...} />
        <Route path="/" element={...} />
      </Routes>
    </Router>
  );
}
```

---

### 2. Auth.tsx - Authentication Component

**Purpose**: Combined login and signup interface

**Props**:

- `onLogin: (token: string) => void` - Callback after successful login

**Features**:

- Toggle between signup and signin modes
- Form validation
- Error message display
- Success feedback
- Automatic redirect after signup

**State**:

```typescript
const [isSignUp, setIsSignUp] = useState(true);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);
```

**User Flow**:

1. User enters username and password
2. Clicks Sign Up or Sign In button
3. API call is made to backend
4. On success: Token saved, user redirected
5. On error: Error message displayed

---

### 3. TaskDashboard.tsx - Main Dashboard

**Purpose**: Main application view with full task management

**Props**:

- `onLogout: () => void` - Callback for logout action

**Features**:

- Navigation bar with logout button
- Create task button and modal
- Search input
- Status filter dropdown
- Task grid display
- Loading states
- Error handling

**State**:

```typescript
const [tasks, setTasks] = useState<Task[]>([]);
const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [showForm, setShowForm] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
```

**Operations**:

- `fetchTasks()` - Load all tasks from API
- `handleCreateTask()` - Create new task
- `handleUpdateStatus()` - Update task status
- `handleDeleteTask()` - Delete task
- Filter and search logic

---

### 4. TaskCard.tsx - Individual Task Display

**Purpose**: Display and manage individual task

**Props**:

```typescript
interface TaskCardProps {
  task: Task;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}
```

**Features**:

- Task title and description display
- Color-coded status badge
- Status progression button
- Delete button
- Responsive layout

**Status Colors**:

- **OPEN**: Blue (#3498db)
- **IN_PROGRESS**: Orange (#f39c12)
- **DONE**: Green (#2ecc71)

**Status Progression**:

- OPEN → Move to In Progress
- IN_PROGRESS → Move to Done
- DONE → (No further progression)

---

### 5. TaskForm.tsx - Create Task Form

**Purpose**: Modal form for creating new tasks

**Props**:

```typescript
interface TaskFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
  onCancel: () => void;
}
```

**Features**:

- Title input field
- Description textarea
- Form validation
- Submit and cancel buttons
- Loading state during submission
- Error handling

**Validation**:

- Title: Required, cannot be empty
- Description: Required, cannot be empty

---

## API Integration

### API Layer Structure

The API layer is organized into three files:

1. **axios.ts** - Axios instance configuration
2. **auth.ts** - Authentication API calls
3. **tasks.ts** - Task management API calls

---

### 1. axios.ts - HTTP Client Configuration

**Purpose**: Configured Axios instance with interceptors

**Base URL**: `http://localhost:3000`

**Request Interceptor**:

```typescript
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
```

**Response Interceptor**:

```typescript
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  },
);
```

**Features**:

- Automatic JWT token attachment to requests
- Auto-logout on 401 Unauthorized responses
- Centralized error handling
- TypeScript type safety

---

### 2. auth.ts - Authentication API

**Interfaces**:

```typescript
export interface SignUpCredentials {
  username: string;
  password: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
}
```

**API Functions**:

#### signup()

```typescript
export const signup = async (
  credentials: SignUpCredentials,
): Promise<string> => {
  const response = await axiosInstance.post<string>(
    '/auth/signup',
    credentials,
  );
  return response.data;
};
```

**Usage**:

```typescript
const result = await signup({ username: 'john', password: 'Pass123!' });
// Returns: "User created successfully"
```

---

#### signin()

```typescript
export const signin = async (
  credentials: SignInCredentials,
): Promise<SignInResponse> => {
  const response = await axiosInstance.post<SignInResponse>(
    '/auth/signin',
    credentials,
  );
  return response.data;
};
```

**Usage**:

```typescript
const { accessToken } = await signin({
  username: 'john',
  password: 'Pass123!',
});
// Returns: { accessToken: "eyJhbG..." }
```

---

### 3. tasks.ts - Tasks API

**Interfaces**:

```typescript
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface UpdateTaskStatusDto {
  status: TaskStatus;
}

export interface GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
```

**API Functions**:

#### getTasks()

```typescript
export const getTasks = async (
  filters?: GetTasksFilterDto,
): Promise<Task[]> => {
  const response = await axiosInstance.get<Task[]>('/tasks', {
    params: filters,
  });
  return response.data;
};
```

**Usage**:

```typescript
// Get all tasks
const allTasks = await getTasks();

// Filter by status
const openTasks = await getTasks({ status: TaskStatus.OPEN });

// Search tasks
const searchResults = await getTasks({ search: 'meeting' });

// Combined filters
const filtered = await getTasks({
  status: TaskStatus.IN_PROGRESS,
  search: 'project',
});
```

---

#### getTaskById()

```typescript
export const getTaskById = async (id: string): Promise<Task> => {
  const response = await axiosInstance.get<Task>(`/tasks/${id}`);
  return response.data;
};
```

---

#### createTask()

```typescript
export const createTask = async (taskDto: CreateTaskDto): Promise<Task> => {
  const response = await axiosInstance.post<Task>('/tasks', taskDto);
  return response.data;
};
```

**Usage**:

```typescript
const newTask = await createTask({
  title: 'Complete documentation',
  description: 'Write comprehensive API docs',
});
```

---

#### updateTaskStatus()

```typescript
export const updateTaskStatus = async (
  id: string,
  statusDto: UpdateTaskStatusDto,
): Promise<Task> => {
  const response = await axiosInstance.patch<Task>(
    `/tasks/${id}/status`,
    statusDto,
  );
  return response.data;
};
```

**Usage**:

```typescript
const updatedTask = await updateTaskStatus('task-id-123', {
  status: TaskStatus.IN_PROGRESS,
});
```

---

#### deleteTask()

```typescript
export const deleteTask = async (id: string): Promise<string> => {
  const response = await axiosInstance.delete<string>(`/tasks/${id}`);
  return response.data;
};
```

**Usage**:

```typescript
const result = await deleteTask('task-id-123');
// Returns: "Task Deleted Successfully"
```

---

## Authentication Flow

### Sign Up Flow

```
1. User enters username and password
   ↓
2. Click "Sign Up" button
   ↓
3. auth.signup() API call
   ↓
4. Backend validates and creates user
   ↓
5. Success message displayed
   ↓
6. User automatically switched to sign in mode
```

### Sign In Flow

```
1. User enters username and password
   ↓
2. Click "Sign In" button
   ↓
3. auth.signin() API call
   ↓
4. Backend validates credentials
   ↓
5. Backend returns JWT token
   ↓
6. Token saved to localStorage
   ↓
7. onLogin() callback updates App state
   ↓
8. User redirected to /tasks
```

### Protected Route Access

```
1. User navigates to /tasks
   ↓
2. App checks isAuthenticated state
   ↓
3a. If authenticated: Render TaskDashboard
3b. If not authenticated: Redirect to /auth
```

### Logout Flow

```
1. User clicks "Logout" button
   ↓
2. onLogout() callback called
   ↓
3. Token removed from localStorage
   ↓
4. isAuthenticated set to false
   ↓
5. User redirected to /auth
```

### Token Attachment (Automatic)

```
Every API request:
   ↓
1. Axios request interceptor runs
   ↓
2. Gets token from localStorage
   ↓
3. Adds Authorization header:
   "Bearer <token>"
   ↓
4. Request sent to backend
```

### Auto-Logout on 401

```
API returns 401 Unauthorized:
   ↓
1. Axios response interceptor catches error
   ↓
2. Removes token from localStorage
   ↓
3. Redirects to /auth
   ↓
4. User must log in again
```

---

## 🛣️ Routing

### Route Configuration

```typescript
<Router>
  <Routes>
    {/* Auth Route */}
    <Route
      path="/auth"
      element={
        isAuthenticated ? (
          <Navigate to="/tasks" replace />
        ) : (
          <Auth onLogin={handleLogin} />
        )
      }
    />

    {/* Protected Tasks Route */}
    <Route
      path="/tasks"
      element={
        isAuthenticated ? (
          <TaskDashboard onLogout={handleLogout} />
        ) : (
          <Navigate to="/auth" replace />
        )
      }
    />

    {/* Default Route */}
    <Route
      path="/"
      element={<Navigate to={isAuthenticated ? '/tasks' : '/auth'} replace />}
    />
  </Routes>
</Router>
```

### Route Behaviors

| Route    | Authenticated | Unauthenticated |
| -------- | ------------- | --------------- |
| `/`      | → `/tasks`    | → `/auth`       |
| `/auth`  | → `/tasks`    | Show login      |
| `/tasks` | Show tasks    | → `/auth`       |

---

## Styling

### Global Styles (index.css)

- CSS Reset
- Root variables for colors
- Typography settings
- Global layout styles
- Utility classes

### Component Styles

Each component has its own CSS file:

- **Auth.css**: Login/signup form styles
- **TaskDashboard.css**: Dashboard layout and controls
- **TaskCard.css**: Task card styling with status colors
- **TaskForm.css**: Form modal styles

### Color Scheme

```css
:root {
  /* Primary Colors */
  --primary: #3498db;
  --success: #2ecc71;
  --warning: #f39c12;
  --danger: #e74c3c;

  /* Status Colors */
  --status-open: #3498db;
  --status-in-progress: #f39c12;
  --status-done: #2ecc71;

  /* Neutral Colors */
  --background: #f5f5f5;
  --card-bg: #ffffff;
  --text: #333333;
  --text-light: #666666;
  --border: #e0e0e0;
}
```

### Responsive Design

```css
/* Mobile First Approach */
.task-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .task-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .task-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## Development

### Available Scripts

```bash
# Start development server with hot reload
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Run ESLint
yarn lint

# Auto-fix ESLint errors
yarn lint:fix

# Format code with Prettier
yarn format

# Check formatting
yarn format:check
```

### Development Server

Vite development server features:

- **Hot Module Replacement (HMR)**: Instant updates without page reload
- **Fast Refresh**: Preserves component state during updates
- **TypeScript Checking**: Real-time type error detection
- **Instant Server Start**: Sub-second server startup

### Development Workflow

1. **Start Dev Server**: `yarn dev`
2. **Make Changes**: Edit files in `src/`
3. **Auto-Reload**: Browser updates instantly
4. **Check Types**: TypeScript errors shown in editor
5. **Lint Code**: `yarn lint` before commit
6. **Format Code**: `yarn format` before commit

### Code Quality

#### ESLint Configuration

```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
```

#### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always"
}
```

### Adding New Components

1. **Create Component File**:

```typescript
// src/components/MyComponent.tsx
import { useState } from 'react';
import './MyComponent.css';

interface MyComponentProps {
  title: string;
}

function MyComponent({ title }: MyComponentProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

export default MyComponent;
```

2. **Create Stylesheet**:

```css
/* src/components/MyComponent.css */
.my-component {
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
}
```

3. **Import and Use**:

```typescript
import MyComponent from './components/MyComponent';

<MyComponent title="Hello World" />;
```

### Adding New API Functions

1. **Define Interfaces** in `tasks.ts`:

```typescript
export interface MyData {
  id: string;
  name: string;
}
```

2. **Create API Function**:

```typescript
export const getMyData = async (): Promise<MyData[]> => {
  const response = await axiosInstance.get<MyData[]>('/my-endpoint');
  return response.data;
};
```

3. **Use in Component**:

```typescript
const fetchData = async () => {
  try {
    const data = await getMyData();
    setData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
```

---

## Building for Production

### Build Command

```bash
# Build optimized production bundle
yarn build
```

This creates a `dist/` folder with optimized files:

- Minified JavaScript
- Optimized CSS
- Compressed assets
- Source maps
- Hashed filenames for caching

### Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js       # Main JavaScript bundle
│   ├── index-[hash].css      # Compiled CSS
│   └── [assets]-[hash].[ext] # Static assets
└── vite.svg
```

### Preview Build

```bash
# Preview production build locally
yarn preview
```

Opens production build at: http://localhost:4173

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Dev server port
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
  },
});
```

---

## Troubleshooting

### Cannot Connect to Backend

**Problem**: API calls fail with network errors

**Solution**:

1. Verify backend is running on port 3000
2. Check backend URL in `axios.ts`:
   ```typescript
   baseURL: 'http://localhost:3000';
   ```
3. Ensure CORS is enabled in backend

---

### Token Not Persisting

**Problem**: User logged out after page refresh

**Solution**:

1. Check browser console for errors
2. Verify localStorage is not disabled
3. Check token is being saved:
   ```typescript
   localStorage.setItem('accessToken', token);
   ```
4. Clear localStorage and try again:
   ```javascript
   localStorage.clear();
   ```

---

### 401 Unauthorized Errors

**Problem**: All API calls return 401

**Solution**:

1. Check token is in localStorage
2. Verify token format (should be JWT)
3. Check Authorization header in Network tab
4. Backend JWT_SECRET might have changed - re-login
5. Token might be expired - re-login

---

### TypeScript Errors

**Problem**: Type errors in editor

**Solution**:

```bash
# Delete node_modules and reinstall
rm -rf node_modules
yarn install

# Check TypeScript version
yarn list typescript
```

---

### Vite Build Errors

**Problem**: Build fails with errors

**Solution**:

1. Check all imports are correct
2. Remove unused imports
3. Fix TypeScript errors first
4. Clear Vite cache:
   ```bash
   rm -rf node_modules/.vite
   yarn dev
   ```

---

### Hot Reload Not Working

**Problem**: Changes don't reflect in browser

**Solution**:

1. Restart dev server
2. Clear browser cache (Ctrl + Shift + R)
3. Check file permissions
4. Check Vite config is correct

---

### Module Not Found

**Problem**: `Cannot find module 'react'` or similar

**Solution**:

```bash
# Install missing dependencies
yarn install

# If persists, clean install
rm -rf node_modules yarn.lock
yarn install
```

---

### Port Already in Use

**Problem**: `Port 5173 is already in use`

**Solution**:

```bash
# Windows: Find and kill process
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or change port in vite.config.ts
server: {
  port: 5174
}
```

---

### CORS Errors

**Problem**: CORS policy blocking requests

**Solution**:

1. Ensure backend CORS is configured:
   ```typescript
   app.enableCors({
     origin: 'http://localhost:5173',
     credentials: true,
   });
   ```
2. Check frontend URL matches CORS origin
3. Restart backend after CORS changes

---

## 📊 Performance Optimization

### Code Splitting

```typescript
// Lazy load components
import { lazy, Suspense } from 'react';

const TaskDashboard = lazy(() => import('./components/TaskDashboard'));

<Suspense fallback={<div>Loading...</div>}>
  <TaskDashboard onLogout={handleLogout} />
</Suspense>;
```

### Memoization

```typescript
import { useMemo, useCallback } from 'react';

// Memoize expensive computations
const filteredTasks = useMemo(() => {
  return tasks.filter((task) => task.status === statusFilter);
}, [tasks, statusFilter]);

// Memoize callbacks
const handleDelete = useCallback(
  (id: string) => {
    deleteTask(id);
  },
  [deleteTask],
);
```

### Debounce Search

```typescript
import { useEffect, useState } from 'react';

const [searchTerm, setSearchTerm] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);

  return () => clearTimeout(timer);
}, [searchTerm]);
```

---

## 🚀 Deployment

### Build for Production

```bash
# Create optimized build
yarn build
```

### Deploy to Static Hosting

The `dist/` folder can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` branch
- **AWS S3**: Upload to S3 bucket
- **Firebase Hosting**: `firebase deploy`

### Environment Variables

For production, update API base URL:

```typescript
// axios.ts
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL,
  // ...
});
```

Create `.env.production`:

```env
VITE_API_URL=https://your-production-api.com
```

---

## 📚 Additional Resources

### React Documentation

- [React Official Docs](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)

### Learning Resources

- React Hooks Guide
- TypeScript Handbook
- Axios Documentation
- CSS Grid and Flexbox Guide

---

## 📝 License

UNLICENSED

---

## 👥 Support

For issues or questions:

1. Check the Troubleshooting section
2. Review browser console for errors
3. Check Network tab in DevTools
4. Verify backend is running
5. Clear localStorage and try again

---

**Frontend application is ready! Start the dev server with `yarn dev` and open http://localhost:5173** 🚀
