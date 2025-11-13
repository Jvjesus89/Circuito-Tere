import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { swaggerSpec } from './docs/swagger.js';
import avaliacaoRouter from './routes/avaliacao.routes.js';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
			return callback(null, true);
		}
		return callback(new Error('Not allowed by CORS'));
	}
}));

app.use(morgan('dev'));

app.get('/health', (_req, res) => {
	res.json({ status: 'ok', service: 'avaliacao', timestamp: new Date().toISOString() });
});

app.use('/api/avaliacao', avaliacaoRouter);

// Serve raw swagger JSON so the gateway can aggregate it
app.get('/api-docs.json', (_req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

// Fallback 404
app.use((_req, res) => {
	res.status(404).json({ message: 'Not Found' });
});

export default app;
