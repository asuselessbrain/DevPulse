import express, { Application, Request, Response } from 'express';
import cors from "cors";
import { UserRouter } from './app/modules/user/user.route';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.use('/api/auth', UserRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running .......');
});

export default app;