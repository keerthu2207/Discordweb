export interface User {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile {
    id: number;
    email: string;
    name: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}