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

export const AuthService = {
    createUserInDB,
}