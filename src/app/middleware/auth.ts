import { NextFunction, Request, Response } from "express"
import AppError from "../errors/AppError"
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { pool } from "../db";

const auth = (...roles: string[]) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization

        if(!token){
            throw new AppError("Unauthorized", 401);
        }

        let decoded;

        try {
            decoded = jwt.verify(token, config.jwtSecret) as JwtPayload
        } catch (error) {
            throw new AppError("Invalid token", 401);
        }

        const isUserExist = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [decoded.id]
        )

        if(isUserExist.rows.length === 0){
            throw new AppError("User not found", 404);
        }

        if(roles.length && !roles.includes(isUserExist.rows[0].role)){
            throw new AppError("Forbidden Access!", 403)
        }

        req.user = decoded


        next(); 
    }

}

export default auth;