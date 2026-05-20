import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../../utils/sendResponse";

const createUser = catchAsync(async(req: Request, res: Response) =>{
    const result = await AuthService.createUserInDB(req.body);
    sendResponse(res, {
        status: 201,
        success: true,
        message: "User registered successfully",
        data: result,
    })
})


const loginUser = catchAsync(async(req: Request, res: Response) =>{
    const result = await AuthService.loginUserInDB(req.body);
    sendResponse(res, {
        status: 200,
        success: true,
        message: "Login successful",
        data: result,
    })
})

export const AuthController = {
    createUser,
    loginUser
}