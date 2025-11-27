import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import proxy from 'express-http-proxy';
import swaggerUi from 'swagger-ui-express';

const app = express();

// Middleware
app.use(helmet());

// Apenas para swagger, não para as rotas de proxy
app.use('/api-docs', express.json());
app.use('/health', express.json());

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

// URLs dos microserviços
const USUARIOS_SERVICE_URL = process.env.USUARIOS_SERVICE_URL || 'http://localhost:3001';
const PARQUES_SERVICE_URL = process.env.PARQUES_SERVICE_URL || 'http://localhost:3002';
const EVENTOS_SERVICE_URL = process.env.EVENTOS_SERVICE_URL || 'http://localhost:3003';
const AVALIACAO_SERVICE_URL = process.env.AVALIACAO_SERVICE_URL || 'http://localhost:3004';
const AI_AGENT_SERVICE_URL = process.env.AI_AGENT_SERVICE_URL || 'http://localhost:3005';

// Health check
app.get('/health', (_req, res) => {
	res.json({ status: 'ok', service: 'gateway', timestamp: new Date().toISOString() });
});

// Rotas do Gateway - usando express-http-proxy
app.use('/api/usuarios', proxy(USUARIOS_SERVICE_URL, {
	proxyReqPathResolver: (req) => {
		console.log('[gateway] proxying POST /api/usuarios to', USUARIOS_SERVICE_URL);
		console.log('[gateway] body:', req.body);
		return '/api/usuarios' + (req.url === '/' ? '' : req.url);
	}
}));

app.use('/api/parques', proxy(PARQUES_SERVICE_URL, {
	proxyReqPathResolver: (req) => '/api/parques' + (req.url === '/' ? '' : req.url)
}));

app.use('/api/trilhas', proxy(PARQUES_SERVICE_URL, {
	proxyReqPathResolver: (req) => '/api/trilhas' + (req.url === '/' ? '' : req.url)
}));

app.use('/api/eventos', proxy(EVENTOS_SERVICE_URL, {
	proxyReqPathResolver: (req) => '/api/eventos' + (req.url === '/' ? '' : req.url)
}));

app.use('/api/avaliacao', proxy(AVALIACAO_SERVICE_URL, {
	proxyReqPathResolver: (req) => '/api/avaliacao' + (req.url === '/' ? '' : req.url)
}));

app.use('/api/chat', proxy(AI_AGENT_SERVICE_URL, {
	proxyReqPathResolver: (req) => '/api/chat' + (req.url === '/' ? '' : req.url)
}));

app.use('/api/tools', proxy(AI_AGENT_SERVICE_URL, {
	proxyReqPathResolver: (req) => '/api/tools' + (req.url === '/' ? '' : req.url)
}));

app.use('/api/tool/execute', proxy(AI_AGENT_SERVICE_URL, {
	proxyReqPathResolver: (req) => '/api/tool/execute' + (req.url === '/' ? '' : req.url)
}));

const swaggerOptions = {
	urls: [
		{ url: '/api-docs/combined.json', name: 'All APIs (combined)' },
		{ url: '/api-docs/usuarios.json', name: 'API de Usuários' },
		{ url: '/api-docs/parques.json', name: 'API de Parques & Trilhas' },
		{ url: '/api-docs/eventos.json', name: 'API de Eventos' },
		{ url: '/api-docs/avaliacao.json', name: 'API de Avaliação' }
	]
};

// JSON spec proxy endpoints (gateway -> internal service)
app.get('/api-docs/usuarios.json', proxy(USUARIOS_SERVICE_URL, {
	proxyReqPathResolver: () => '/api-docs.json'
}));

app.get('/api-docs/parques.json', proxy(PARQUES_SERVICE_URL, {
	proxyReqPathResolver: () => '/api-docs.json'
}));

app.get('/api-docs/eventos.json', proxy(EVENTOS_SERVICE_URL, {
	proxyReqPathResolver: () => '/api-docs.json'
}));

app.get('/api-docs/avaliacao.json', proxy(AVALIACAO_SERVICE_URL, {
	proxyReqPathResolver: () => '/api-docs.json'
}));

// Combined spec endpoint: fetches all service specs, merges them and caches result
const specCache = { data: null, expiresAt: 0 };
async function fetchJson(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
	return res.json();
}

function mergeSpecs(specs) {
	const combined = { openapi: '3.0.0', info: { title: 'Circuito Terê API', version: '1.0.0' }, paths: {}, components: {} };
	for (const s of specs) {
		if (s.paths) Object.assign(combined.paths, s.paths);
		if (s.components) {
			combined.components = combined.components || {};
			for (const key of Object.keys(s.components)) {
				combined.components[key] = Object.assign(combined.components[key] || {}, s.components[key]);
			}
		}
	}
	return combined;
}

app.get('/api-docs/combined.json', async (req, res) => {
	try {
		const now = Date.now();
		if (specCache.data && specCache.expiresAt > now) {
			return res.json(specCache.data);
		}

		const urls = [
			`${USUARIOS_SERVICE_URL}/api-docs.json`,
			`${PARQUES_SERVICE_URL}/api-docs.json`,
			`${EVENTOS_SERVICE_URL}/api-docs.json`,
			`${AVALIACAO_SERVICE_URL}/api-docs.json`
		];
		const promises = urls.map(u => fetchJson(u).catch(e => {
			console.error('[gateway] failed fetch spec:', u, e.message);
			return null;
		}));
		const specs = (await Promise.all(promises)).filter(Boolean);
		if (specs.length === 0) return res.status(502).json({ message: 'Failed to fetch any specs' });

		const combined = mergeSpecs(specs);
		specCache.data = combined;
		specCache.expiresAt = Date.now() + 30_000;
		res.json(combined);
	} catch (err) {
		console.error('Error building combined spec:', err);
		res.status(500).json({ message: 'Error building combined spec' });
	}
});

// Pass swaggerOptions inside the wrapper object expected by swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerOptions }));

// Fallback 404
app.use((req, res) => {
	res.status(404).json({ message: 'Not Found' });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`[gateway] running on port ${port} (${process.env.NODE_ENV || 'production'})`);
	console.log(`  - Usuarios Service: ${USUARIOS_SERVICE_URL}`);
	console.log(`  - Parques Service: ${PARQUES_SERVICE_URL}`);
	console.log(`  - Eventos Service: ${EVENTOS_SERVICE_URL}`);
	console.log(`  - Avaliacao Service: ${AVALIACAO_SERVICE_URL}`);
	console.log(`  - AI Agent Service: ${AI_AGENT_SERVICE_URL}`);
});
