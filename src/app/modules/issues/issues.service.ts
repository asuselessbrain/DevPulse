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

const getAllIssuesFromDB = async (query: Record<string, unknown>) => {

    let sqlQuery = `SELECT * FROM issues WHERE 1=1`;
    let value: any[] = []

    if(query.status){
        sqlQuery += ` AND status = $${value.length + 1}`;
        value.push(query.status);
    }

    if(query.type){
        sqlQuery += ` AND type = $${value.length + 1}`;
        value.push(query.type);
    }

    let sortOrder = 'DESC';
    
    if(query.sort === "oldest"){
        sortOrder = "ASC";
    }

    sqlQuery += ` ORDER BY created_at ${sortOrder}`;


    const issues = await pool.query(
        sqlQuery,
        value
    )

    const issueWithOutReporter = issues.rows

    const issueWithReporter = await Promise.all(issueWithOutReporter.map(async (issue) => {
        const reporter = await pool.query(
            `SELECT id, name, role FROM users WHERE id = $1`,
            [issue.reporter_id]
        )
        return { ...issue, reporter: reporter.rows[0] };
    }))
    return issueWithReporter;
}

export const IssuesService = {
    createIssue,
    getAllIssuesFromDB,
}