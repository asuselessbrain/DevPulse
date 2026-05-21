import express, { Application, Request, Response } from 'express';
import cors from "cors";
import globalErrorHandler from './errors/globalErrorHandler';
import notFound from './errors/notFound';
import { AuthRouter } from './modules/auth/auth.route';
import { IssuesRouter } from './modules/issues/issues.route';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.use('/api/auth', AuthRouter)
app.use('/api/issues', IssuesRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running .......');
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;