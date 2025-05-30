# E-commerce Project

This is a full-stack e-commerce application with separate frontend and backend services.

## Project Structure

```
ecom/
├── frontend/     # Frontend application
└── backend/      # Backend application
```

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- Frontend runs on: http://localhost:5173
- Backend runs on: http://localhost:3001

## Git Workflow

This project uses a monorepo structure where both frontend and backend are managed in the same repository. This allows for:

- Coordinated changes between frontend and backend
- Easier version control
- Simplified deployment process

### Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch
- Feature branches should be created from `develop`
