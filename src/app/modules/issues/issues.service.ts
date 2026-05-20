import { pool } from "../../db";
import { IIssue } from "./issues.interface";

const createIssue = async (payload: IIssue, reporter_id: string) => {
    const { title, description, type } = payload;

    const issue = await pool.query(
        `INSERT INTO issues(title, description, type, status, reporter_id) VALUES($1, $2, $3, 'open', $4) RETURNING *`,
        [title, description, type, reporter_id]
    );

    return issue.rows[0];
}

export const IssuesService = {
    createIssue,
}