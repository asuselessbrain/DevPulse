import { config } from "../../config";
import { pool } from "../../db";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";

const createUserInDB = async (payload: IUser) => {

    const hashedPassword = await bcrypt.hash(payload.password, config.saltRounds);

    const user = await pool.query(
        `INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, COALESCE($4, 'contributor')) RETURNING *`,
        [payload.name, payload.email, hashedPassword, payload.role]
    );

    delete user.rows[0].password;

    return user.rows[0];
}

const loginUserInDB = async(payload: {email: string, password: string}) => {
    const user = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [payload.email]
    );

    if (user.rows.length === 0) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(payload.password, user.rows[0].password);

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    delete user.rows[0].password;
    return user.rows[0];
}

export const AuthService = {
    createUserInDB,
    loginUserInDB,
}