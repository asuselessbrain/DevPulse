import { Response } from "express";

interface IData <T> {
    status: number;
    success: boolean;
    message: string;
    errorMessage?: string;
    data?: T;
    error?: T;
}

export const sendResponse = <T>(res: Response, data: IData<T>) => {
    res.status(data.status).json({
        success: data.success,
        message: data.message,
        data: data.data,
        errorMessage: data.errorMessage,
        error: data.error,
    })
}