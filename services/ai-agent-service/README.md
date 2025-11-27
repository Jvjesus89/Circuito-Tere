# AI Agent Service - Circuito Terê

Serviço de IA com **Model Context Protocol (MCP)** que integra o Google Gemini para consultas inteligentes sobre parques, trilhas, eventos e avaliações.

## 🎯 Características

- ✅ **Model Context Protocol (MCP)**: Expõe microserviços como ferramentas para Gemini
- ✅ **10 Ferramentas Disponíveis**: List/Get para usuários, parques, trilhas, eventos e avaliações
- ✅ **Gemini 2.0 Flash**: Modelo de IA mais rápido e eficiente
- ✅ **LangChain Integration**: Facilita chamadas ao Gemini com suporte a tools
- ✅ **Express API**: Endpoints para chat e execução de ferramentas

## 📦 Dependências

```json
{
  "@langchain/core": "^0.1.46",
  "@langchain/google-genai": "^0.0.14",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.19.2",
  "node-fetch": "^3.3.2"
}
```

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# Google API
GOOGLE_API_KEY=your_google_api_key_here

# Node
NODE_ENV=production
PORT=3005

# Microserviços (URLs internas do Docker)
USUARIOS_SERVICE_URL=http://usuarios-service:3001/api/usuarios
PARQUES_SERVICE_URL=http://parques-service:3002/api/parques
TRILHAS_SERVICE_URL=http://parques-service:3002/api/trilhas
EVENTOS_SERVICE_URL=http://eventos-service:3003/api/eventos
AVALIACAO_SERVICE_URL=http://avaliacao-service:3004/api/avaliacao

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:8000
```

Copie `.env.example` para `.env` e configure sua chave do Google Gemini.

## 🚀 Endpoints

### POST `/api/chat`

Envia uma pergunta para o Gemini, que pode autonomamente usar as ferramentas MCP.

**Request:**
```json
{
  "query": "Quais parques temos disponíveis?"
}
```

**Response:**
```json
{
  "response": "Temos 3 parques cadastrados: ...",
  "timestamp": "2024-01-15T10:30:00Z",
  "tools_enabled": true
}
```

### GET `/api/tools`

Lista todas as ferramentas MCP disponíveis.

**Response:**
```json
{
  "tools": [
    {
      "name": "list_usuarios",
      "description": "Lista todos os usuários cadastrados no sistema",
      "inputSchema": { "type": "object", "properties": {}, "required": [] }
    },
    ...
  ],
  "totalTools": 10
}
```

### POST `/api/tool/execute`

Executa uma ferramenta específica diretamente (sem passar pelo Gemini).

**Request:**
```json
{
  "tool": "list_parques",
  "input": {}
}
```

**Response:**
```json
{
  "tool": "list_parques",
  "input": {},
  "result": [
    { "idparque": 1, "parque": "Parque da Água Branca", ... }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### GET `/health`

Health check do serviço.

**Response:**
```json
{
  "status": "ok",
  "service": "ai-agent",
  "mcp": "enabled",
  "model": "gemini-2.0-flash",
  "tools": 10,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🛠️ Ferramentas MCP Disponíveis

| Ferramenta | Descrição | Parâmetros |
|---|---|---|
| `list_usuarios` | Lista todos os usuários | - |
| `get_usuario` | Obtém usuário por ID | `id` (número) |
| `list_parques` | Lista todos os parques | - |
| `get_parque` | Obtém parque por ID | `id` (número) |
| `list_trilhas` | Lista todas as trilhas | - |
| `get_trilha` | Obtém trilha por ID | `id` (número) |
| `list_eventos` | Lista todos os eventos | - |
| `get_evento` | Obtém evento por ID | `id` (número) |
| `list_avaliacoes` | Lista todas as avaliações | - |
| `get_avaliacao` | Obtém avaliação por ID | `id` (número) |

## 🤖 Como Funciona o MCP

1. **Registro de Ferramentas**: Ao iniciar, o serviço registra 10 ferramentas no Gemini
2. **Processamento de Consultas**: O Gemini recebe a pergunta do usuário
3. **Chamada de Ferramentas**: Se necessário, Gemini chama as ferramentas MCP
4. **Execução**: O agente executa as ferramentas e retorna os dados
5. **Resposta Final**: Gemini fornece uma resposta baseada nos dados obtidos

**Exemplo de Fluxo:**
```
Usuário: "Quais eventos tem esse mês?"
   ↓
Gemini: Preciso buscar os eventos (chama list_eventos)
   ↓
MCP: Retorna JSON com eventos
   ↓
Gemini: Processa e responde "Temos 5 eventos cadastrados: ..."
```

## 📚 Arquivos Principais

- `agent.js`: Servidor Express com endpoints de chat e health check
- `mcp-server.js`: Definições das ferramentas MCP e lógica de execução
- `package.json`: Dependências do projeto
- `Dockerfile`: Imagem Docker (Node 20-alpine)

## 🐳 Uso com Docker Compose

O serviço é iniciado automaticamente com `docker-compose up`:

```bash
# Iniciar todos os serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f ai-agent-service

# Parar
docker-compose down
```

## 🔌 Integração com Gateway

O gateway expõe os endpoints do AI Agent:

- `POST http://localhost:8000/api/chat` → Envia pergunta para Gemini
- `GET http://localhost:8000/api/tools` → Lista ferramentas disponíveis

## 🎓 Exemplos de Uso

### Via cURL

```bash
# Chat com Gemini usando MCP
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Mostre os parques perto de São Paulo"}'

# Listar ferramentas
curl http://localhost:8000/api/tools

# Executar ferramenta diretamente
curl -X POST http://localhost:8000/api/tool/execute \
  -H "Content-Type: application/json" \
  -d '{"tool": "list_parques", "input": {}}'
```

### Via JavaScript/Node

```javascript
const response = await fetch('http://localhost:8000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'Quais eventos têm avaliações altas?'
  })
});

const data = await response.json();
console.log(data.response);
```

## 📝 Notas

- Certifique-se de que a chave `GOOGLE_API_KEY` está configurada
- O serviço conecta aos outros microserviços via Docker network `circuito-network`
- Cache de 30s para especificações OpenAPI combinadas no gateway
- Ferramentas retornam JSON formatado para melhor legibilidade

## 🐛 Troubleshooting

### "GOOGLE_API_KEY não configurada"
Configure a variável de ambiente no `.env` ou no docker-compose.yml

### "Falha ao acessar microserviço"
Verifique se os URLs em `MICROSERVICES` estão corretos e os serviços estão rodando

### "Tool não encontrada"
Verifique a ortografia do nome da ferramenta em `/api/tools`

## 📄 Licença

Projeto Circuito Terê - 2024
