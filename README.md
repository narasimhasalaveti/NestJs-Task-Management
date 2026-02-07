# NestJS Task Management API

Task management API built with NestJS, JWT authentication, and MySQL (TypeORM). Users can register, sign in, and manage their own tasks with filtering and status updates.

## Features

- JWT-based authentication with Passport strategy
- MySQL persistence via TypeORM entities
- Task ownership and per-user access control
- Task filtering by status and full-text search on title/description
- Global validation pipe for DTOs and automatic response transformation

## Tech Stack

- NestJS 11
- TypeORM 0.3
- MySQL (mysql2)
- Passport + JWT
- class-validator + class-transformer
- Jest + Supertest

## Project Structure

```
src/
	app.module.ts
	main.ts
	config.schema.ts
	transform.interceptor.ts
	auth/
		auth.controller.ts
		auth.module.ts
		auth.service.ts
		get-user.decorator.ts
		jwt-payload.interface.ts
		jwt.strategy.ts
		user.entity.ts
		dto/
			auth-credentials.dto.ts
	tasks/
		task.entity.ts
		tasks-status.enum.ts
		tasks.controller.ts
		tasks.module.ts
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

## Install

```bash
yarn install
```

## Run

```bash
# development
yarn run start

# watch mode (STAGE=dev)
yarn run start:dev

# production (STAGE=prod, requires built dist)
yarn run start:prod
```

The application listens on `PORT` if provided, otherwise `3000`.

## API

Base URL: `http://localhost:3000`

### Auth

#### POST /auth/signup

Creates a user.

Body:

```json
{
	"username": "string (4-20)",
	"password": "string (6-32, strong)"
}
```

Password rule: at least one uppercase, one lowercase, and one number or special character.

#### POST /auth/signin

Returns an access token.

Body:

```json
{
	"username": "string",
	"password": "string"
}
```

Response:

```json
{
	"accessToken": "<jwt>"
}
```

### Tasks (Bearer token required)

All task routes require `Authorization: Bearer <token>`.

#### GET /tasks

Optional query parameters:

- `status` = `OPEN` | `IN_PROGRESS` | `DONE`
- `search` = text search in title/description

#### GET /tasks/:id

Returns a single task for the authenticated user.

#### POST /tasks

Body:

```json
{
	"title": "string",
	"description": "string"
}
```

#### DELETE /tasks/:id

Deletes a task owned by the authenticated user.

#### PATCH /tasks/:id/status

Body:

```json
{
	"status": "OPEN | IN_PROGRESS | DONE"
}
```

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
