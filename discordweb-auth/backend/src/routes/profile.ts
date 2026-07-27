import { Router } from 'express';
import { ProfileController } from '../controllers/profileController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const profileController = new ProfileController();

// Route to get user profile
router.get('/profile', authMiddleware, profileController.getUserProfile);

// Route to update user profile
router.put('/profile', authMiddleware, profileController.updateUserProfile);

export default router;