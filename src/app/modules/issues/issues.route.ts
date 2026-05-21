import { Router } from "express";
import { IssuesController } from "./issues.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../auth/user.interface";

const router = Router();

router.post('/', auth(UserRole.contributor, UserRole.maintainer), IssuesController.createIssue);
router.get('/', IssuesController.getAllIssues);
router.get('/:id', IssuesController.getIssueById);
    
export const IssuesRouter = router;