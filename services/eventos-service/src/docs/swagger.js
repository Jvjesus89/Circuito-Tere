import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Eventos Service API',
		version: '1.0.0',
		description: 'Microserviço para gestão de eventos'
	},
	// Use relative server URL so the gateway can mount the service under /api/eventos
	servers: [
		{ url: '/api/eventos', description: 'Gateway mount (relative)' }
	],
	tags: [
		{ name: 'Eventos', description: 'Operações relacionadas a eventos' }
	]
};

const options = {
	definition: swaggerDefinition,
	apis: ['src/routes/**/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);
