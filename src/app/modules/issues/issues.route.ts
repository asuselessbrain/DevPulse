import { Router } from "express";
import { IssuesController } from "./issues.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../auth/user.interface";

const router = Router();

router.post('/', auth(UserRole.contributor, UserRole.maintainer), IssuesController.createIssue);
router.get('/', IssuesController.getAllIssues)
export const IssuesRouter = router;