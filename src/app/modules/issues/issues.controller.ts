import { Request, Response } from "express"
import { catchAsync } from "../../../utils/catchAsync"
import { IssuesService } from "./issues.service";

const createIssue = catchAsync(async(req: Request, res: Response) =>{
    const reporter_id = req.user?.id;

    const result = await IssuesService.createIssue(req.body, reporter_id);
    res.status(201).json({
        success: true,
        message: "Issue created successfully",
        data: result,
    });
})

const getAllIssues = catchAsync(async(req: Request, res: Response) =>{
    const result = await IssuesService.getAllIssuesFromDB(req.query);
    res.status(200).json({
        success: true,
        message: "Issues retrieved successfully",
        data: result,
    });
})

const getIssueById = catchAsync(async(req: Request, res: Response) =>{
    const issue_id = req.params.id;
    const result = await IssuesService.getSingleIssueFromDB(issue_id as string);
    res.status(200).json({
        success: true,
        message: "Issue retrieved successfully",
        data: result,
    });
})


export const IssuesController = {
    createIssue,
    getAllIssues,
    getIssueById
}