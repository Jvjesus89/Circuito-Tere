FROM node:20-alpine

WORKDIR /app

# Copiar package.json e instalar dependências
COPY package.json package-lock.json* ./
RUN npm install

# Copiar código da aplicação
COPY src/ ./src/

# Expor porta
EXPOSE 3005

# Comando para iniciar o serviço
CMD ["npm", "start"]
