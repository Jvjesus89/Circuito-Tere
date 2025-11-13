import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Avaliação Service API',
    version: '1.0.0',
    description: 'Microserviço para avaliações'
  },
  servers: [
    { url: '/api/avaliacao', description: 'Gateway mount (relative)' }
  ],
  tags: [
    { name: 'Avaliacao', description: 'Operações relacionadas a avaliações' }
  ]
};

const options = {
  definition: swaggerDefinition,
  apis: ['src/routes/**/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);
