import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Usuários Service API',
		version: '1.0.0',
		description: 'Microserviço para gestão de usuários'
	},
	// Use relative server URL so the gateway can mount the service under /api/usuarios
	servers: [
		{ url: '/api/usuarios', description: 'Gateway mount (relative)' }
	],
	tags: [
		{ name: 'Usuarios', description: 'Operações relacionadas a usuários' }
	]
};

const options = {
	definition: swaggerDefinition,
	apis: ['src/routes/**/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);
