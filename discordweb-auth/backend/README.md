# DiscordWeb Authentication Backend

This is the backend for the DiscordWeb authentication application, which implements user registration, login, logout, and profile management features using a local SQLite database.

## Features

- User Registration
- User Login
- User Logout
- Profile Management (View and Update)

## Technologies Used

- Node.js
- Express.js
- SQLite
- TypeScript

## Project Structure

```
backend
├── src
│   ├── index.ts               # Entry point of the backend application
│   ├── routes
│   │   ├── auth.ts            # Authentication routes (registration, login)
│   │   └── profile.ts         # User profile routes (get, update)
│   ├── controllers
│   │   ├── authController.ts   # Controller for authentication logic
│   │   └── profileController.ts # Controller for profile logic
│   ├── models
│   │   └── userModel.ts       # User model for database interactions
│   ├── db
│   │   └── sqlite.ts          # SQLite database connection setup
│   └── middleware
│       └── authMiddleware.ts   # Middleware for authentication
├── package.json                # Backend dependencies and scripts
├── tsconfig.json               # TypeScript configuration for the backend
└── README.md                   # Documentation for the backend
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd discordweb-auth/backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Log in an existing user
- **GET /api/profile**: Get the logged-in user's profile
- **PUT /api/profile**: Update the logged-in user's profile

## License

This project is licensed under the MIT License.