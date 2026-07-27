import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';

export class AuthController {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public async registerUser(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const existingUser = await this.userModel.findUserByEmail(email);
            if (existingUser) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            const newUser = await this.userModel.createUser(email, password);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const user = await this.userModel.findUserByEmail(email);
            if (!user || user.password !== password) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            // Here you would typically generate a token and send it back
            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
}