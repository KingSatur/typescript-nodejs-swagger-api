import express from 'express';
import cors from 'cors';
import routes from './routes/tasks.routes';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';
import { swaggerConfig } from './swaggerConfig';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

const specs = swaggerJSDoc(swaggerConfig);
app.use('/docs', SwaggerUI.serve, SwaggerUI.setup(specs));

export default app;
