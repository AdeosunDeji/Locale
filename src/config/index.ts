import dotenv from 'dotenv';
import { isEmpty } from 'lodash';
import logger from 'pino'

dotenv.config();

const config = {
  logger: logger(),
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  APP_NAME: process.env.APP_NAME
}

const absentConfig = Object.entries(config)
.map(([key, value]) => [key, !!value])
.filter(([, value]) => !value)
.map(([key]) => key);

if (!isEmpty(absentConfig)) {
throw new Error(`Missing Config: ${absentConfig.join(", ")}`);
}

export default config;