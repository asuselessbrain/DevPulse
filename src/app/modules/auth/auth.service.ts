import { config } from "../../config";
import { pool } from "../../db";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { StringValue } from 'ms';

const createUserInDB = async (payload: IUser) => {

    const hashedPassword = await bcrypt.hash(payload.password, config.saltRounds);

    const user = await pool.query(
        `INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, COALESCE($4, 'contributor')) RETURNING *`,
        [payload.name, payload.email, hashedPassword, payload.role]
    );

    delete user.rows[0].password;

    return user.rows[0];
}

const loginUserInDB = async (payload: { email: string, password: string }) => {
    const user = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [payload.email]
    );

    if (user.rows.length === 0) {
        throw new AppError("User not found", 404);
    }

    const isMatch = await bcrypt.compare(payload.password, user.rows[0].password);

    if (!isMatch) {
        throw new AppError("Invalid password", 400);
    }

    delete user.rows[0].password;

    const currentUser = user.rows[0];

    const token = jwt.sign({id: currentUser.id, name: currentUser.name, email: currentUser.email, role: currentUser.role}, config.jwtSecret as string, { expiresIn: config.jwtExpireTime as StringValue });
    return { token, user: currentUser };
}

export const AuthService = {
    createUserInDB,
    loginUserInDB,
}