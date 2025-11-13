import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Circuito Terê API',
		version: '1.1.0',
		description: 'API de microserviço para usuários, parques e trilhas com PostgreSQL'
	},
	servers: [
		{ url: 'http://localhost:3000', description: 'Local' }
	],
	tags: [
		{ name: 'Usuarios', description: 'Operações relacionadas a usuários' },
		{ name: 'Parques', description: 'Operações relacionadas a parques' },
		{ name: 'Trilhas', description: 'Operações relacionadas a trilhas' }
	]
};

const options = {
	definition: swaggerDefinition,
	apis: ['src/routes/**/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);


