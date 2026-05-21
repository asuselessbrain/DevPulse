import { Pool } from 'pg'
import { config } from '../config';

export const pool = new Pool({
    connectionString: config.dbUrl
})


export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )`)

            await pool.query(`
                    CREATE TABLE IF NOT EXISTS issues(
                        id SERIAL PRIMARY KEY NOT NULL,
                        title VARCHAR(255) NOT NULL,
                        description TEXT,
                        type VARCHAR(50) NOT NULL CHECK (type IN ('bug', 'feature_request')),
                        status VARCHAR(50) NOT NULL CHECK (status IN ('open', 'in_progress', 'resolved')),
                        reporter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                        created_at TIMESTAMP DEFAULT NOW(),
                        updated_at TIMESTAMP DEFAULT NOW()
                    )
                `)
    } catch (error) {
        console.log(error);
    }
}