import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
export const PORT: number = Number(process.env.PORT) || 3003;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('¡Backend del club náutico funcionando!');
});
export default app