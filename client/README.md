# Task Management Frontend

React + TypeScript frontend for the NestJS Task Management application.

## Features

- User Authentication (Sign Up / Sign In)
- JWT Token Management
- Create, Read, Update, Delete Tasks
- Filter tasks by status
- Search tasks
- Task status management (Open → In Progress → Done)

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Make sure your NestJS backend is running on http://localhost:3000

3. Start the development server:

```bash
yarn dev
```

4. Open http://localhost:5173 in your browser

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Auto-fix ESLint errors
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router v6
- Axios
