import { Database } from 'sqlite3';
import { open } from 'sqlite';

export class UserModel {
    private db: Database;

    constructor() {
        this.initializeDatabase();
    }

    private async initializeDatabase() {
        this.db = await open({
            filename: './database.sqlite',
            driver: Database
        });
        await this.db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name TEXT
            )
        `);
    }

    public async createUser(email: string, password: string, name: string) {
        const result = await this.db.run('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, password, name]);
        return result.lastID;
    }

    public async findUserByEmail(email: string) {
        return await this.db.get('SELECT * FROM users WHERE email = ?', [email]);
    }

    public async updateUser(id: number, name: string) {
        await this.db.run('UPDATE users SET name = ? WHERE id = ?', [name, id]);
    }

    public async getUserById(id: number) {
        return await this.db.get('SELECT * FROM users WHERE id = ?', [id]);
    }
}