import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";

const createUser = catchAsync(async(req: Request, res: Response) =>{
    const result = await AuthService.createUserInDB(req.body);
    res.status(200).json({
        success: true,
        message: "User created successfully",
        data: result,
    });
})

export const AuthController = {
    createUser,
}