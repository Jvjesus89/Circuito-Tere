import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger.js';
import usuariosRouter from './routes/usuarios.routes.js';
import parquesRouter from './routes/parques.routes.js';
import trilhasRouter from './routes/trilhas.routes.js';

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
	res.json({ status: 'ok', service: 'usuarios', timestamp: new Date().toISOString() });
});

app.use('/api/usuarios', usuariosRouter);
app.use('/api/parques', parquesRouter);
app.use('/api/trilhas', trilhasRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Fallback 404
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
	res.status(404).json({ message: 'Not Found' });
});

export default app;


