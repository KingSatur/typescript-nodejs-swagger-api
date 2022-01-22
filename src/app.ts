import express from 'express';
import cors from 'cors';
import routes from './routes/tasks.routes';

import morgan from 'morgan';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

export default app;
