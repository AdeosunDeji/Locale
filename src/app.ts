import express from 'express';
import cors from 'cors';
import config from './config';
import router from './routes';
import { rateLimit } from 'express-rate-limit';
import reqLogger from './utils/reqlogger';
import { CustomRequest } from './utils/interface';

declare global {
  namespace Express {
    interface Request extends CustomRequest { }
  }
}

function createServer() {
  
  const app = express();

  const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 80 requests per `window` (here, per 30 minutes)
    message: 'Too many requests from this IP. Please try again after 5 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
  
  app.use(cors());
  app.use(express.json());
  app.use(limiter);
  

  
  app.use(reqLogger);
  app.use("/api/v1", router);
  
  app.get("/", (req, res) => {
    res.send(`Welcome to ${config.APP_NAME}`);
  });
  
  app.use((req, res) => res.status(404).send({
    status: "error",
    error: "Not found",
    message: "Route not correct kindly check url.",
  }));

  return app;

}


export default createServer;