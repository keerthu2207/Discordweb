import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();
const authController = new AuthController();

// User registration route
router.post('/register', authController.registerUser);

// User login route
router.post('/login', authController.loginUser);

// User logout route (optional, can be handled on the client-side)
router.post('/logout', (req, res) => {
    // Handle logout logic (e.g., clearing tokens)
    res.status(200).json({ message: 'Logged out successfully' });
});

export default router;