import { pool } from "../../db";
import { IUser } from "./user.interface";

const createUserInDB = async (payload: IUser) => {
    const user = await pool.query(
        `INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *`,
        [payload.name, payload.email, payload.password, payload.role]
    );

    delete user.rows[0].password;
    
    return user.rows[0];
}

export const UserService = {
    createUserInDB,
}