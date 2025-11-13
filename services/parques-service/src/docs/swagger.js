import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Parques & Trilhas Service API',
		version: '1.0.0',
		description: 'Microserviço para gestão de parques e trilhas'
	},
	// Use relative server URL so the gateway can mount the service under /api/parques
	servers: [
		{ url: '/api/parques', description: 'Gateway mount (relative)' }
	],
	tags: [
		{ name: 'Parques', description: 'Operações relacionadas a parques' },
		{ name: 'Trilhas', description: 'Operações relacionadas a trilhas' }
	]
};

const options = {
	definition: swaggerDefinition,
	apis: ['src/routes/**/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);
