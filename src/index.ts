import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { apiRouter } from '../src/routes/index';

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRouter);

//server configuration
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

export default app;
