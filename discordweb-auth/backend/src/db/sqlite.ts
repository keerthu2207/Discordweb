import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initializeDatabase = async () => {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
};

const dbPromise = initializeDatabase();

export const getDb = async () => {
    return dbPromise;
};