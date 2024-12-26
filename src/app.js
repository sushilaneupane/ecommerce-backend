import express, { json } from 'express';
import cors from 'cors';
import setupRoutes from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use(json());

setupRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
