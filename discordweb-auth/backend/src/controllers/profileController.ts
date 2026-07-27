import { Request, Response } from 'express';
import UserModel from '../models/userModel';

class ProfileController {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public getUserProfile = async (req: Request, res: Response): Promise<void> => {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        try {
            const userProfile = await this.userModel.findUserById(userId);
            if (userProfile) {
                res.status(200).json(userProfile);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user profile', error });
        }
    };

    public updateUserProfile = async (req: Request, res: Response): Promise<void> => {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const updatedData = req.body;

        try {
            const updatedUser = await this.userModel.updateUser(userId, updatedData);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating user profile', error });
        }
    };
}

export default ProfileController;