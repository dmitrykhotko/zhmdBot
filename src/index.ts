import { config } from 'dotenv';
import { server } from './server';

config();

const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN;
const PORT = process.env.PORT || '3000';

const shouldRun = !!TELEGRAM_API_TOKEN;

shouldRun && server(TELEGRAM_API_TOKEN, PORT);
