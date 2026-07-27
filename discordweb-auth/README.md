# DiscordWeb Authentication Project

This project implements a local SQLite database authentication system for a Discord web application. It includes features for user registration, login, logout, and profile management.

## Project Structure

```
discordweb-auth
├── backend
│   ├── src
│   │   ├── index.ts                # Entry point for the backend application
│   │   ├── routes
│   │   │   ├── auth.ts             # Authentication routes (registration, login)
│   │   │   └── profile.ts          # User profile routes (get, update)
│   │   ├── controllers
│   │   │   ├── authController.ts    # Controller for authentication logic
│   │   │   └── profileController.ts # Controller for profile logic
│   │   ├── models
│   │   │   └── userModel.ts        # User model for database interactions
│   │   ├── db
│   │   │   └── sqlite.ts           # SQLite database connection setup
│   │   └── middleware
│   │       └── authMiddleware.ts   # Middleware for authentication
│   ├── package.json                 # Backend dependencies and scripts
│   ├── tsconfig.json                # TypeScript configuration for backend
│   └── README.md                    # Documentation for the backend
├── frontend
│   ├── src
│   │   ├── App.tsx                 # Main React component
│   │   ├── index.tsx               # Entry point for the React application
│   │   ├── components
│   │   │   ├── Login.tsx           # Login component
│   │   │   ├── Register.tsx        # Registration component
│   │   │   ├── Profile.tsx         # Profile component
│   │   │   └── Logout.tsx          # Logout component
│   │   ├── services
│   │   │   └── authService.ts      # API calls for authentication
│   │   └── types
│   │       └── user.ts             # TypeScript interfaces for user types
│   ├── package.json                 # Frontend dependencies and scripts
│   ├── tsconfig.json                # TypeScript configuration for frontend
│   └── README.md                    # Documentation for the frontend
├── package.json                     # Project-wide dependencies and scripts
├── tsconfig.json                    # Project-wide TypeScript configuration
└── README.md                        # Overall project documentation
```

## Features

- **User Registration**: Users can create an account with a username and password.
- **User Login**: Users can log in using their credentials.
- **User Logout**: Users can log out of their accounts.
- **Profile Management**: Users can view and update their profile information.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd discordweb-auth
   ```

3. Install dependencies for the backend:
   ```
   cd backend
   npm install
   ```

4. Install dependencies for the frontend:
   ```
   cd frontend
   npm install
   ```

5. Start the backend server:
   ```
   cd backend
   npm start
   ```

6. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

## License

This project is licensed under the MIT License.