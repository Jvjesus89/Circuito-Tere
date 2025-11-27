# 🎯 Exemplos de Queries MCP

Aqui estão exemplos de perguntas que você pode fazer ao Gemini através do MCP.

## Usando o Endpoint `/api/chat`

### 1. Queries sobre Usuários

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Quantos usuários estão cadastrados?"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Mostre todos os usuários com seus emails"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Existe um usuário chamado joao?"}'
```

### 2. Queries sobre Parques

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Quais parques temos disponíveis?"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Qual é o maior parque?"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Liste parques com suas localizações"}'
```

### 3. Queries sobre Trilhas

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Quantas trilhas existem no sistema?"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Mostre todas as trilhas"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Qual é a trilha mais curta?"}'
```

### 4. Queries sobre Eventos

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Quais eventos estão cadastrados?"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Quantos eventos temos?"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Liste os títulos de todos os eventos"}'
```

### 5. Queries sobre Avaliações

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Quantas avaliações foram feitas?"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Qual é a avaliação mais alta no sistema?"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Mostre todas as avaliações com seus comentários"}'
```

### 6. Queries Complexas (Multi-ferramenta)

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Liste parques, trilhas e eventos que temos"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Mostre um resumo de tudo que está cadastrado no sistema"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Quantos usuários, parques, trilhas e eventos temos no total?"}'
```

### 7. Queries com Análise

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Qual é a média de avaliações?"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Quais parques têm avaliações boas?"}'
```

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{"query": "Faça uma análise dos dados cadastrados"}'
```

## Executando Ferramentas Diretamente

Se preferir chamar as ferramentas sem usar Gemini:

### Listar Recursos

```bash
# Listar todos os usuários
curl -X POST http://localhost:8000/api/tool/execute \
  -d '{"tool": "list_usuarios", "input": {}}'

# Listar todos os parques
curl -X POST http://localhost:8000/api/tool/execute \
  -d '{"tool": "list_parques", "input": {}}'

# Listar todas as trilhas
curl -X POST http://localhost:8000/api/tool/execute \
  -d '{"tool": "list_trilhas", "input": {}}'

# Listar todos os eventos
curl -X POST http://localhost:8000/api/tool/execute \
  -d '{"tool": "list_eventos", "input": {}}'

# Listar todas as avaliações
curl -X POST http://localhost:8000/api/tool/execute \
  -d '{"tool": "list_avaliacoes", "input": {}}'
```

### Obter Recurso Específico

```bash
# Obter usuário ID 1
curl -X POST http://localhost:8000/api/tool/execute \
  -d '{"tool": "get_usuario", "input": {"id": 1}}'

# Obter parque ID 1
curl -X POST http://localhost:8000/api/tool/execute \
  -d '{"tool": "get_parque", "input": {"id": 1}}'

# Obter trilha ID 2
curl -X POST http://localhost:8000/api/tool/execute \
  -d '{"tool": "get_trilha", "input": {"id": 2}}'

# Obter evento ID 1
curl -X POST http://localhost:8000/api/tool/execute \
  -d '{"tool": "get_evento", "input": {"id": 1}}'

# Obter avaliação ID 1
curl -X POST http://localhost:8000/api/tool/execute \
  -d '{"tool": "get_avaliacao", "input": {"id": 1}}'
```

## Casos de Uso Recomendados

1. **Dashboard**: Mostrar estatísticas (total de usuários, parques, etc.)
2. **Busca Natural**: Permitir perguntas em português sobre os dados
3. **Chatbot**: Integrar em um chat para respostas automáticas
4. **Relatórios**: Gerar resumos dos dados cadastrados
5. **Analytics**: Questões complexas que requerem análise de dados

## Dicas

- Use `| jq` para formatar saída JSON (install: `brew install jq`)
- Teste ferramentas individuais antes de usar Gemini
- Verifique logs com `docker-compose logs -f ai-agent-service`
- Variáveis de contexto podem ser passadas no objeto query

```bash
curl -X POST http://localhost:8000/api/chat \
  -d '{
    "query": "Mostre estatísticas",
    "context": "Usuário admin consultando dados gerenciais"
  }'
```

---
