# Full-Stack Task Management Application

Complete task management application with NestJS backend API, React frontend, JWT authentication, and MySQL database. Users can register, sign in, and manage their own tasks with filtering and status updates.

## 🚀 Quick Start

**Want to get started quickly?** See [QUICKSTART.md](./QUICKSTART.md) for step-by-step instructions!

### Run in 3 Steps:

1. **Install frontend dependencies:**

   ```bash
   yarn client:install
   ```

2. **Start backend (Terminal 1):**

   ```bash
   yarn start:dev
   ```

3. **Start frontend (Terminal 2):**

   ```bash
   yarn client:dev
   ```

4. **Open browser:** http://localhost:5173

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get up and running in minutes
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup documentation
- **[client/README.md](./client/README.md)** - Frontend-specific docs

## ✨ Features

### Backend (NestJS)

- JWT-based authentication with Passport strategy
- MySQL persistence via TypeORM entities
- Task ownership and per-user access control
- Task filtering by status and full-text search
- Global validation and response transformation
- CORS enabled for frontend integration

### Frontend (React)

- Modern React 18 with TypeScript
- User authentication (signup/signin)
- Protected routes and JWT token management
- Task CRUD operations
- Filter tasks by status
- Search functionality
- Real-time status updates
- Responsive UI design

## 🛠️ Tech Stack

### Backend

- NestJS 11
- TypeORM 0.3
- MySQL (mysql2)
- Passport + JWT
- class-validator + class-transformer
- Jest + Supertest
  📁 Project Structure

```
nestjs-task-management/
├── src/                          # Backend (NestJS)
│   ├── app.module.ts
│   ├── main.ts
│   ├── config.schema.ts
│   ├── transform.interceptor.ts
│   ├── auth/                     # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── get-user.decorator.ts
│   │   ├── jwt-payload.interface.ts
│   │   ├── jwt.strategy.ts
│   │   ├── user.entity.ts
│   │   └── dto/
│   │       └── auth-credentials.dto.ts
│   └── tasks/                    # Tasks module
│       ├── task.entity.ts
│       ├── tasks-status.enum.ts
│       ├── tasks.controller.ts
│       ├── tasks.module.ts
│       ├── tasks.service.ts
│       └── dto/
│           ├── create-task.dto.ts
│           ├── get-tasks-filter.dto.ts
│           └── update-task-status.dto.ts
├── client/                       # Frontend (React)
│   ├── src/
│   │   ├── api/                  # API integration
│   │   │   ├── axios.ts
│   │   │   ├── auth.ts
│   │   │   └── tasks.ts
│   │   ├── components/           # React components
│   │   │   ├── Auth.tsx
│   │   │   ├── TaskDashboard.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── TaskForm.tsx
│   │   ├── App.tsx
│  ⚙️ Environment Configuration

The backend index.html
│   ├── vite.config.ts
│   └── package.json
├── test/                         # Backend tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── package.json                  # Backend dependencies
├── QUICKSTART.md                 # Quick start guide
└── SETUP_GUIDE.md               # Complete setup guide.ts
		tasks.service.ts
		dto/
			create-task.dto.ts
			get-tasks-filter.dto.ts
			update-task-status.dto.ts
test/
	app.e2e-spec.ts
	jest-e2e.json
```

## Environment Configuration

The app loads environment variables from `.env.stage.${STAGE}`.

Required variables (see [src/config.schema.ts](src/config.schema.ts)):

- `STAGE` (e.g., `dev`, `prod`)
- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_DATABASE`
- `JWT_SECRET`

Example files in repo root:

- `.env.stage.dev`
- `.env.stage.prod` (currently empty)

Note: If you use the committed dev file, replace secrets before deploying.

## 💻 Development Commands

### Backend (Root Directory)

````bash
# Install dependencies
yarn install

# Development mode with watch
yarn start:dev

# Production mode
yarn start:prod

# Run tests
yarn test

# E2E tests
yarn test:e2e

# Lint code
npm🌐 API Reference

Base URL: `http://localhost:3000`

### Authentication Endpoints (Public)

#### POST /auth/signup

Creates a user.

Request Body:
```json
{
  "username": "string (4-20 characters)",
  "password": "string (8-32 characters, strong)"
}
````

Password requirements: At least one uppercase, one lowercase, and one number or special character.

Response: Success message

---

#### POST /auth/signin

Authenticates user and returns JWT token.

Request Body:

```json
{
  "username": "string",
  "password": "string"
}
```

Response:

```json
{
  "accessToken": "<jwt-token>"
}
```

---

### Task Endpoints (Protected - Requires Bearer Token)

All task routes require `Authorization: Bearer <token>` header.

#### GET /tasks

Get all tasks for authenticated user with optional filters.

Query Parameters (optional):

- `status` = `OPEN` | `IN_PROGRESS` | `DONE`
- `search` = text search in title/description

Response:

```json
[
  {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "status": "OPEN | IN_PROGRESS | DONE"
  }
]
```

---

#### GET /tasks/:id

Returns a single task for the authenticated user.

Response: Single task object

---

#### POST /tasks

Create a new task.
🧪 Tests

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## 🎨 Lint & Format

```bash
yarn lint
yarn format
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes with Passport guards
- User-specific data isolation
- CORS configuration for frontend integration
- Token expiration and refresh handling

## 📸 Application Screenshots

### Authentication

- Sign up with username and password validation
- Sign in with JWT token generation
- Persistent login with localStorage

### Task Management Dashboard

- Create, view, update, and delete tasks
- Filter tasks by status (Open, In Progress, Done)
- Search tasks by title or description
- Status progression (Open → In Progress → Done)
- User-specific task lists

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under UNLICENSED.

## 📞 Support

For issues or questions:

- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed documentation
- Review [QUICKSTART.md](./QUICKSTART.md) for common setup issues
- Open an issue in the repository

---

#### PATCH /tasks/:id/status

Update task status.

Request Body:

```json
{
  "status": "OPEN | IN_PROGRESS | DONE"
}
```

Response: Updated task objectjson
{
"title": "string",
"description": "string"
}

````

#### DELETE /tasks/:id

Deletes a task owned by the authenticated user.

#### PATCH /tasks/:id/status

Body:

```json
{
	"status": "OPEN | IN_PROGRESS | DONE"
}
````

## Tests

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## Lint & Format

```bash
yarn run lint
yarn run format
```
