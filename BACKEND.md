# NestJS Task Management - Backend Documentation

Complete documentation for the NestJS backend API with MySQL database, JWT authentication, and TypeORM.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Authentication System](#authentication-system)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Testing](#testing)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

---

## 📖 Overview

This is a full-featured NestJS backend application that provides a secure REST API for task management. It includes user authentication with JWT tokens, MySQL database persistence using TypeORM, and complete CRUD operations for tasks with filtering and search capabilities.

### Key Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Task Management**: Complete CRUD operations for tasks
- **Data Isolation**: Users can only access their own tasks
- **Filtering & Search**: Filter tasks by status and search by keywords
- **Validation**: Class-validator for request validation
- **CORS**: Configured for frontend integration
- **TypeORM**: Database abstraction with entity relationships

---

## 🛠️ Tech Stack

### Core Framework

- **NestJS 11.0.1** - Progressive Node.js framework
- **TypeScript 5.7.3** - Type-safe JavaScript
- **Node.js** - Runtime environment

### Database

- **MySQL** - Relational database
- **TypeORM 0.3.28** - ORM for TypeScript
- **mysql2 3.16.2** - MySQL client

### Authentication

- **Passport 0.7.0** - Authentication middleware
- **Passport-JWT 4.0.1** - JWT strategy
- **@nestjs/jwt 11.0.2** - JWT module
- **bcrypt 6.0.0** - Password hashing

### Validation & Configuration

- **class-validator 0.14.3** - Validation decorators
- **class-transformer 0.5.1** - Transform objects
- **@hapi/joi 17.1.1** - Environment validation
- **@nestjs/config 4.0.3** - Configuration module

### Development Tools

- **Jest 30.0.0** - Testing framework
- **SuperTest 7.0.0** - HTTP testing
- **ESLint 9.18.0** - Code linting
- **Prettier 3.4.2** - Code formatting
- **cross-env 10.1.0** - Environment variables

---

## 📁 Project Structure

```
nestjs-task-management/
├── src/
│   ├── main.ts                      # Application entry point
│   ├── app.module.ts                # Root module
│   ├── config.schema.ts             # Environment validation schema
│   ├── transform.interceptor.ts     # Response transformation
│   │
│   ├── auth/                        # Authentication Module
│   │   ├── auth.module.ts           # Auth module configuration
│   │   ├── auth.controller.ts       # Auth endpoints (signup, signin)
│   │   ├── auth.service.ts          # Auth business logic
│   │   ├── jwt.strategy.ts          # Passport JWT strategy
│   │   ├── jwt-payload.interface.ts # JWT payload interface
│   │   ├── user.entity.ts           # User database entity
│   │   ├── get-user.decorator.ts    # Custom decorator for user
│   │   └── dto/
│   │       ├── auth-credentials.dto.ts      # Signup DTO
│   │       └── signin-credentials.dto.ts    # Signin DTO
│   │
│   └── tasks/                       # Tasks Module
│       ├── tasks.module.ts          # Tasks module configuration
│       ├── tasks.controller.ts      # Task endpoints
│       ├── tasks.service.ts         # Task business logic
│       ├── task.entity.ts           # Task database entity
│       ├── tasks-status.enum.ts     # Task status enum
│       └── dto/
│           ├── create-task.dto.ts           # Create task DTO
│           ├── update-task-status.dto.ts    # Update status DTO
│           └── get-tasks-filter.dto.ts      # Filter tasks DTO
│
├── test/                            # E2E Tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env.stage.dev                   # Development environment variables
├── .env.stage.prod                  # Production environment variables
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.build.json              # Build configuration
├── nest-cli.json                    # Nest CLI configuration
└── eslint.config.mjs                # ESLint configuration
```

---

## ⚙️ Environment Configuration

The application uses stage-based environment files: `.env.stage.${STAGE}`

### Required Environment Variables

Create `.env.stage.dev` in the root directory:

```env
# Application Stage
STAGE=dev

# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=task_management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### Configuration Validation

The `config.schema.ts` file validates all environment variables:

```typescript
export const configValidationSchema = joi?.object({
  STAGE: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().default(3306).required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_DATABASE: joi.string().required(),
  JWT_SECRET: joi.string().required(),
});
```

---

## 🗄️ Database Setup

### MySQL Database Creation

```sql
-- Create database
CREATE DATABASE task_management;

-- Use database
USE task_management;

-- Tables are automatically created by TypeORM synchronize option
```

### Database Entities

#### User Entity

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
```

#### Task Entity

```typescript
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User;
}
```

### Task Status Enum

```typescript
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
```

### TypeORM Configuration

Located in `app.module.ts`:

```typescript
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    autoLoadEntities: true,
    synchronize: true, // Disable in production!
  }),
});
```

**⚠️ Warning**: Set `synchronize: false` in production to prevent automatic schema changes.

---

## 🔐 Authentication System

### JWT Strategy

The application uses Passport JWT strategy for authentication.

#### JWT Payload Structure

```typescript
export interface JwtPayload {
  username: string;
}
```

#### JWT Strategy Implementation

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

### Password Security

- **Hashing**: bcrypt with salt generation
- **Salt Rounds**: 10 rounds (bcrypt default)
- **Validation**: Strong password requirements

#### Password Hashing Process

```typescript
const salt = await bcrypt.genSalt();
const hashedPassword = await bcrypt.hash(password, salt);
```

#### Password Verification

```typescript
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

### Authentication Guard

Protected routes use `@UseGuards(AuthGuard())` decorator.

---

## 🌐 API Endpoints

Base URL: `http://localhost:3000`

### Authentication Endpoints (Public)

#### 1. Sign Up

**Endpoint**: `POST /auth/signup`

**Description**: Create a new user account

**Request Body**:

```json
{
  "username": "john_doe",
  "password": "SecurePass123!"
}
```

**Validation Rules**:

- Username: 4-20 characters
- Password: 8-32 characters, at least one uppercase, one lowercase, and one number/special character

**Success Response** (201):

```json
"User created successfully"
```

**Error Responses**:

```json
// 409 Conflict
{
  "statusCode": 409,
  "message": "Username already exists"
}

// 400 Bad Request
{
  "statusCode": 400,
  "message": ["username must be longer than or equal to 4 characters"],
  "error": "Bad Request"
}
```

---

#### 2. Sign In

**Endpoint**: `POST /auth/signin`

**Description**: Authenticate user and receive JWT token

**Request Body**:

```json
{
  "username": "john_doe",
  "password": "SecurePass123!"
}
```

**Success Response** (200):

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (401):

```json
{
  "statusCode": 401,
  "message": "Please check your login credentials",
  "error": "Unauthorized"
}
```

---

### Task Endpoints (Protected)

All task endpoints require JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

---

#### 3. Get All Tasks

**Endpoint**: `GET /tasks`

**Description**: Get all tasks for authenticated user with optional filters

**Query Parameters**:

- `status` (optional): `OPEN` | `IN_PROGRESS` | `DONE`
- `search` (optional): Search term for title/description

**Examples**:

```bash
GET /tasks
GET /tasks?status=OPEN
GET /tasks?search=meeting
GET /tasks?status=IN_PROGRESS&search=project
```

**Success Response** (200):

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project documentation",
    "description": "Write comprehensive docs for the API",
    "status": "IN_PROGRESS"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Team meeting",
    "description": "Discuss Q1 goals",
    "status": "OPEN"
  }
]
```

---

#### 4. Get Task by ID

**Endpoint**: `GET /tasks/:id`

**Description**: Get a specific task by ID (must belong to authenticated user)

**Success Response** (200):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete project documentation",
  "description": "Write comprehensive docs for the API",
  "status": "IN_PROGRESS"
}
```

**Error Response** (404):

```json
{
  "statusCode": 404,
  "message": "Task with ID \"550e8400...\" not found",
  "error": "Not Found"
}
```

---

#### 5. Create Task

**Endpoint**: `POST /tasks`

**Description**: Create a new task

**Request Body**:

```json
{
  "title": "New task title",
  "description": "Task description here"
}
```

**Validation Rules**:

- Title: Required, not empty
- Description: Required, not empty

**Success Response** (201):

```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "title": "New task title",
  "description": "Task description here",
  "status": "OPEN"
}
```

**Error Response** (400):

```json
{
  "statusCode": 400,
  "message": ["title should not be empty", "description should not be empty"],
  "error": "Bad Request"
}
```

---

#### 6. Update Task Status

**Endpoint**: `PATCH /tasks/:id/status`

**Description**: Update the status of a task

**Request Body**:

```json
{
  "status": "IN_PROGRESS"
}
```

**Valid Status Values**:

- `OPEN`
- `IN_PROGRESS`
- `DONE`

**Success Response** (200):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete project documentation",
  "description": "Write comprehensive docs for the API",
  "status": "IN_PROGRESS"
}
```

**Error Response** (400):

```json
{
  "statusCode": 400,
  "message": ["status must be a valid enum value"],
  "error": "Bad Request"
}
```

---

#### 7. Delete Task

**Endpoint**: `DELETE /tasks/:id`

**Description**: Delete a task (must belong to authenticated user)

**Success Response** (200):

```json
"Task Deleted Successfully"
```

**Error Response** (404):

```json
{
  "statusCode": 404,
  "message": "Task with ID \"550e8400...\" not found",
  "error": "Not Found"
}
```

---

## ✨ Features

### 1. User Authentication

- **Sign Up**: Create new user with unique username
- **Sign In**: Authenticate and receive JWT token
- **Password Security**: Bcrypt hashing with salt
- **Token-Based Auth**: JWT tokens for stateless authentication

### 2. Task Management

- **Create**: Add new tasks with title and description
- **Read**: View all tasks or specific task by ID
- **Update**: Change task status (Open → In Progress → Done)
- **Delete**: Remove tasks
- **Search**: Full-text search in title and description
- **Filter**: Filter tasks by status

### 3. Data Isolation

- Users can only access their own tasks
- All task operations are scoped to authenticated user
- Database-level user-task relationship

### 4. Validation & Error Handling

- **Request Validation**: DTOs with class-validator
- **Error Messages**: Clear, descriptive error responses
- **Status Codes**: Proper HTTP status codes
- **Exception Filters**: NestJS built-in exception handling

### 5. CORS Configuration

Configured to accept requests from React frontend:

```typescript
app.enableCors({
  origin: 'http://localhost:5173', // React dev server
  credentials: true,
});
```

### 6. Global Interceptors

**Transform Interceptor**: Removes sensitive data from responses

```typescript
app.useGlobalInterceptors(new TransformInterceptor());
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- Yarn package manager

### Step 1: Install Dependencies

```bash
# Install backend dependencies
yarn install
```

### Step 2: Configure Environment

Create `.env.stage.dev` file:

```env
STAGE=dev
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=task_management
JWT_SECRET=your_secret_key_here
```

### Step 3: Setup Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE task_management;

# Exit MySQL
exit
```

### Step 4: Start Development Server

```bash
# Start backend with hot-reload
yarn start:dev
```

Backend will run on: **http://localhost:3000**

---

## 💻 Development

### Available Scripts

```bash
# Development
yarn start:dev          # Start with hot-reload
yarn start:debug        # Start in debug mode
yarn start:prod         # Start production build

# Build
yarn build              # Compile TypeScript

# Testing
yarn test               # Run unit tests
yarn test:watch         # Run tests in watch mode
yarn test:cov           # Run tests with coverage
yarn test:e2e           # Run end-to-end tests

# Code Quality
yarn lint               # Lint and auto-fix
yarn format             # Format code with Prettier
```

### Development Workflow

1. **Make Changes**: Edit files in `src/`
2. **Auto-Reload**: Server restarts automatically
3. **Test**: Run tests to verify changes
4. **Lint**: Check code quality
5. **Commit**: Commit changes to git

### Adding New Features

#### Create New Module

```bash
nest generate module feature-name
nest generate controller feature-name
nest generate service feature-name
```

#### Create New Entity

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
```

#### Create New DTO

```typescript
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
```

---

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn test:cov
```

### E2E Tests

```bash
# Run end-to-end tests
yarn test:e2e
```

### Test Structure

```
src/
├── auth/
│   ├── auth.service.spec.ts      # Unit tests for auth service
│   └── auth.controller.spec.ts   # Unit tests for auth controller
└── tasks/
    ├── tasks.service.spec.ts     # Unit tests for tasks service
    └── tasks.controller.spec.ts  # Unit tests for tasks controller

test/
└── app.e2e-spec.ts               # End-to-end tests
```

---

## 🔒 Security

### 1. Password Security

- **Hashing**: bcrypt with automatic salt generation
- **No Plain Text**: Passwords never stored in plain text
- **Strong Passwords**: Validation enforces complexity

### 2. JWT Security

- **Secret Key**: Configured via environment variable
- **Token Expiration**: Configurable expiration time
- **Bearer Token**: Standard authorization header

### 3. Authentication Guards

- **Route Protection**: `@UseGuards(AuthGuard())`
- **User Extraction**: Custom `@GetUser()` decorator
- **Automatic Validation**: Passport strategy validates each request

### 4. Input Validation

- **DTOs**: All inputs validated with class-validator
- **Sanitization**: class-transformer handles data transformation
- **Type Safety**: TypeScript ensures type correctness

### 5. SQL Injection Prevention

- **Parameterized Queries**: TypeORM uses prepared statements
- **ORM Protection**: No raw SQL queries

### 6. CORS Configuration

- **Origin Whitelist**: Only configured origins allowed
- **Credentials**: Properly configured for cookie/auth handling

### Security Best Practices

```typescript
// ✅ DO: Use environment variables
const secret = configService.get('JWT_SECRET');

// ❌ DON'T: Hardcode secrets
const secret = 'my-secret-key';

// ✅ DO: Validate all inputs
@IsString()
@IsNotEmpty()
username: string;

// ❌ DON'T: Trust user input
// No validation

// ✅ DO: Use guards for protected routes
@UseGuards(AuthGuard())
@Get()
getTasks() { }

// ❌ DON'T: Leave routes unprotected
@Get()
getTasks() { }
```

---

## 🐛 Troubleshooting

### Database Connection Issues

**Problem**: `ER_ACCESS_DENIED_ERROR: Access denied for user`

**Solution**:

1. Check MySQL username and password in `.env.stage.dev`
2. Verify MySQL is running: `mysql -u root -p`
3. Grant proper permissions:

```sql
GRANT ALL PRIVILEGES ON task_management.* TO 'username'@'localhost';
FLUSH PRIVILEGES;
```

---

**Problem**: `connect ECONNREFUSED 127.0.0.1:3306`

**Solution**:

1. Start MySQL service
2. Check MySQL is listening on port 3306
3. Verify DB_HOST and DB_PORT in environment

---

### JWT Authentication Issues

**Problem**: `401 Unauthorized` on protected routes

**Solution**:

1. Ensure JWT token is included in header:
   ```
   Authorization: Bearer <token>
   ```
2. Check token is valid (not expired)
3. Verify JWT_SECRET matches between sign and verify

---

**Problem**: `Invalid token` or `Malformed JWT`

**Solution**:

1. Check token format (should be three base64 parts)
2. Ensure no extra spaces in Authorization header
3. Verify JWT_SECRET is set correctly

---

### Validation Errors

**Problem**: `400 Bad Request - validation failed`

**Solution**:

1. Check request body matches DTO structure
2. Verify all required fields are present
3. Ensure data types match (string, number, etc.)
4. Review validation rules in DTOs

---

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:

```bash
# Windows: Find process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in .env.stage.dev
PORT=3001
```

---

### Module Not Found Errors

**Problem**: `Cannot find module '@nestjs/common'`

**Solution**:

```bash
# Delete node_modules and reinstall
rm -rf node_modules
yarn install

# Or clean install
yarn cache clean
yarn install
```

---

### TypeORM Synchronize Issues

**Problem**: Schema changes not reflected in database

**Solution**:

1. Check `synchronize: true` in TypeORM config
2. Restart backend server
3. For production, use migrations:

```bash
# Generate migration
yarn typeorm migration:generate -n MigrationName

# Run migration
yarn typeorm migration:run
```

---

## 📊 Performance Tips

### 1. Database Indexing

Add indexes for frequently queried fields:

```typescript
@Entity()
export class Task {
  @Index()
  @Column()
  status: TaskStatus;
}
```

### 2. Query Optimization

Use query builder for complex queries:

```typescript
const tasks = await this.tasksRepository
  .createQueryBuilder('task')
  .where('task.userId = :userId', { userId })
  .andWhere('task.status = :status', { status })
  .getMany();
```

### 3. Caching

Consider adding caching for frequently accessed data:

```typescript
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
})
export class AppModule {}
```

### 4. Pagination

Implement pagination for large datasets:

```typescript
const [tasks, total] = await this.tasksRepository.findAndCount({
  skip: (page - 1) * limit,
  take: limit,
});
```

---

## 🚀 Deployment

### Production Checklist

- [ ] Set `synchronize: false` in TypeORM config
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set proper CORS origins
- [ ] Configure environment variables
- [ ] Set up database backups
- [ ] Enable logging
- [ ] Set up monitoring
- [ ] Configure rate limiting
- [ ] Use production database

### Build for Production

```bash
# Build the application
yarn build

# Start production server
yarn start:prod
```

### Environment Variables

Update `.env.stage.prod`:

```env
STAGE=prod
PORT=3000
DB_HOST=production-db-host
DB_PORT=3306
DB_USERNAME=prod_user
DB_PASSWORD=strong_production_password
DB_DATABASE=task_management_prod
JWT_SECRET=very_strong_secret_key_for_production
```

---

## 📚 Additional Resources

### NestJS Documentation

- [NestJS Official Docs](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Passport Documentation](http://www.passportjs.org/)

### Learning Resources

- NestJS Fundamentals Course
- TypeScript Deep Dive
- REST API Best Practices
- JWT Authentication Guide

---

## 📝 License

UNLICENSED

---

## 👥 Support

For issues or questions:

1. Check the Troubleshooting section
2. Review NestJS documentation
3. Check console logs for detailed errors
4. Verify environment configuration

---

**Backend API is ready! Start the server with `yarn start:dev` and connect your frontend!** 🚀
