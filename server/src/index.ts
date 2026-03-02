import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/environment';
import { RokuService } from './services/roku-service';
import { RokuController } from './controllers/roku-controller';
import { createRouter } from './routes/roku-routes';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

const service = new RokuService(env.ROKU_IP);
const controller = new RokuController(service);
const router = createRouter(controller);

app.use('/api/v1', router);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`RokuJS server running on port ${env.PORT}`);
  console.log(`Roku IP: ${env.ROKU_IP}`);
});
