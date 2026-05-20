import { Router } from "express";
import { IssuesController } from "./issues.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post('/', auth(), IssuesController.createIssue);

export const IssuesRouter = router;