# DiscordWeb Authentication Frontend

This project is a React application that provides authentication features for a Discord web application using a local SQLite database. It includes user registration, login, logout, and profile management functionalities.

## Features

- **User Registration**: Users can create a new account by providing their email and password.
- **User Login**: Users can log in to their accounts using their credentials.
- **User Logout**: Users can log out of their accounts.
- **Profile Management**: Users can view and update their profile information.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd discordweb-auth/frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server, run:
```
npm start
```

The application will be available at `http://localhost:3000`.

### Folder Structure

- `src/`: Contains the source code for the React application.
  - `components/`: Contains React components for login, registration, profile, and logout.
  - `services/`: Contains services for making API calls related to authentication.
  - `types/`: Contains TypeScript interfaces for user-related types.

### API Endpoints

The frontend communicates with the backend API for authentication. Ensure the backend server is running to access the following endpoints:

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.
- `GET /api/profile`: Get user profile information.
- `PUT /api/profile`: Update user profile information.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.