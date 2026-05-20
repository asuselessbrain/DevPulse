import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { UserService } from "./user.service";

const createUser = catchAsync(async(req: Request, res: Response) =>{
    const result = await UserService.createUserInDB(req.body);
    res.status(200).json({
        success: true,
        message: "User created successfully",
        data: result,
    });
})

export const UserController = {
    createUser,
}