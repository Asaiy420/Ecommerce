# E-commerce Project

This is a full-stack e-commerce application with separate frontend and backend services, built with modern technologies and best practices.

## 🚀 Features

### User Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Secure payment processing with Stripe
- Order tracking and history
- User profile management
- Responsive design for all devices

### Admin Features

- Product management (CRUD operations)
- Order management
- User management
- Analytics dashboard with Recharts
- Real-time inventory tracking

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM v7
- **UI Components**:
  - ShadCN UI Kit
  - Framer Motion for animations
  - Lucide React for icons
- **Data Visualization**: Recharts
- **Notifications**: React Hot Toast
- **Payment Integration**: Stripe.js

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Caching**: Redis (ioredis)
- **File Storage**: Cloudinary
- **Payment Processing**: Stripe API
- **Security**: bcryptjs for password hashing

## Project Structure

```
ecom/
├── frontend/     # Frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/     # Page components
│   │   ├── store/     # State management
│   │   └── types/     # TypeScript type definitions
│   └── public/        # Static assets
└── backend/      # Backend application
    └── src/          # Server source code
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

## 🔒 Environment Variables

### Frontend

```
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Backend

```
PORT=3001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
REDIS_URL=your_redis_url
```

## Git Workflow

This project uses a monorepo structure where both frontend and backend are managed in the same repository. This allows for:

- Coordinated changes between frontend and backend
- Easier version control
- Simplified deployment process

### Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch
- Feature branches should be created from `develop`

## 📝 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
