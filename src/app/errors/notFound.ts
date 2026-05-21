import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message:  `Request path ${req.originalUrl} is not found`,
        errors: null
    })
}

export default notFound;