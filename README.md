# Circuito Terê - Arquitetura de Microserviços

Arquitetura de microserviços escalável para a plataforma Circuito Terê, implementando um Gateway API que roteia requisições para múltiplos serviços especializados.

## 🚀 Microsserviços

### Swagger(Porta 8000)
- 📚 Docs: http://localhost:8000/api-docs/

### API Gateway (Porta 8000)
Ponto de entrada único que roteia para todos os microsserviços:
- `/api/usuarios/*` → usuarios-service
- `/api/parques/*` → parques-service
- `/api/trilhas/*` → parques-service
- `/api/eventos/*` → eventos-service
- `/api/avalicao/*` → avaliacao-service
- `/api/chat` → ai-agent-service (MCP)
- `/api/tools` → ai-agent-service (MCP)
- `GET /health` — status dos serviços

### 🤖 AI Agent Service (Porta 3005) - Model Context Protocol (MCP)
Serviço inteligente com Gemini que acessa dados via MCP:
- **POST** `/api/chat` — Faz perguntas em linguagem natural
- **GET** `/api/tools` — Lista ferramentas MCP disponíveis
- **POST** `/api/tool/execute` — Executa ferramenta específica
- **GET** `/health` — Status do serviço

**10 Ferramentas MCP disponíveis:**
- `list_usuarios`, `get_usuario`
- `list_parques`, `get_parque`
- `list_trilhas`, `get_trilha`
- `list_eventos`, `get_evento`
- `list_avaliacoes`, `get_avaliacao`

## 🐳 Docker & Docker Compose

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 20+ (para desenvolvimento local)

### Iniciar com Docker Compose

1. **Criar arquivo .env na raiz do projeto:**
```env
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=circuito_tere
PGPORT=5432
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

**Obtenha sua chave Gemini em:** https://aistudio.google.com/app/apikeys

2. **Iniciar todos os serviços:**
```bash
docker-compose up -d
```

3. **Verificar status:**
```bash
curl http://localhost:8000/health
```

4. **Parar os serviços:**
```bash
docker-compose down
```

### Logs dos containers
```bash
# Todos os serviços
docker-compose logs -f

# Um serviço específico
docker-compose logs -f usuarios-service
docker-compose logs -f parques-service
docker-compose logs -f eventos-service
docker-compose logs -f gateway
```

## 🔧 Desenvolvimento Local

### Segurança
- ✅ Helmet — headers HTTP seguros
- ✅ CORS — controle de origem
- ✅ Morgan — logging de requisições
- ✅ Validação — entrada de dados validada
- ✅ Senha nunca é retornada na API


## 🔍 Swagger/OpenAPI

Possui um swagger geral para todos os microserviços
http://localhost:8000/api-docs/#/

## 🤖 Model Context Protocol (MCP)

O Circuito Terê agora possui um serviço de IA que usa **MCP** para acessar dados dos microserviços.

### Como usar

```bash
# Fazer pergunta ao Gemini (pode chamar ferramentas automaticamente)
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Quais parques temos?"}'

# Listar ferramentas disponíveis
curl http://localhost:8000/api/tools

# Executar ferramenta diretamente (para testes)
curl -X POST http://localhost:8000/api/tool/execute \
  -H "Content-Type: application/json" \
  -d '{"tool": "list_parques", "input": {}}'
```

### Documentação MCP

- 📖 Guia completo: `services/ai-agent-service/MCP-INTEGRATION.md`
- 📋 Sumário: `MCP-IMPLEMENTATION-SUMMARY.md`
- 🧪 Testes: `services/ai-agent-service/test-mcp.js`

## 📦 Scripts Úteis

### Docker
```bash
# Build das imagens
docker-compose build

# Remover containers e volumes
docker-compose down -v

# Reconstruir tudo
docker-compose up -d --build


### Conexão recusada ao BD
- Verificar se PostgreSQL está rodando
- Verificar variáveis de ambiente `.env`
- Verificar permissões de rede do Docker

### Porta já em uso
```bash
# Encontrar processo na porta
lsof -i :8000

# Matar processo
kill -9 <PID>
```

### Gateway não consegue conectar aos microsserviços
- Verificar se os microsserviços estão rodando
- Verificar URLs em `gateway/.env`
- Verificar rede Docker com `docker network ls`


