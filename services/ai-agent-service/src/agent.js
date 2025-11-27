import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { mcpTools, executeTool } from './mcp-server.js';

const app = express();
app.use(express.json());
app.use(cors());

// --- Configuração da IA (LangChain + Google Gemini) com MCP Tools ---
const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  modelName: "gemini-2.0-flash",
  temperature: 0.7,
  tools: mcpTools, 
});

const outputParser = new StringOutputParser();
app.post('/api/chat', async (req, res) => {
  try {
    const { query, context = null } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query é obrigatória' });
    }

    console.log(`[ai-agent] Recebida consulta: "${query}"`);

    // Constrói o prompt com contexto opcional
    let systemPrompt = 
      "Você é um assistente inteligente do 'Circuito Terê'. " +
      "Uma plataforma de descoberta de parques, trilhas e eventos. " +
      "Você tem acesso a ferramentas (MCP - Model Context Protocol) para buscar informações sobre usuários, parques, trilhas, eventos e avaliações. " +
      "Use essas ferramentas para fornecer respostas precisas e úteis. " +
      "Seja amigável, informativo e sempre use os dados reais disponíveis nos microserviços.";

    if (context) {
      systemPrompt += `\n\nContexto adicional: ${context}`;
    }

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ["user", query]
    ]);

    // Invoca o LLM com suporte a tools
    const chain = promptTemplate.pipe(llm).pipe(outputParser);
    const resposta = await chain.invoke({});

    // Log da resposta
    console.log(`[ai-agent] Resposta gerada: ${resposta.substring(0, 100)}...`);

    res.json({ 
      response: resposta,
      timestamp: new Date().toISOString(),
      tools_enabled: true
    });

  } catch (error) {
    console.error('[ai-agent] Erro no processamento da IA:', error);
    res.status(500).json({ 
      error: 'Falha ao processar a resposta da IA', 
      details: error.message 
    });
  }
});

/**
 * Endpoint para listar ferramentas disponíveis (MCP Tools)
 */
app.get('/api/tools', (req, res) => {
  res.json({
    tools: mcpTools,
    description: 'Ferramentas disponíveis via Model Context Protocol (MCP)',
    totalTools: mcpTools.length
  });
});

/**
 * Endpoint para executar uma ferramenta específica diretamente
 * Útil para testes ou chamadas diretas sem passar pelo Gemini
 */
app.post('/api/tool/execute', async (req, res) => {
  try {
    const { tool, input } = req.body;

    if (!tool) {
      return res.status(400).json({ error: 'Nome da ferramenta é obrigatório' });
    }

    console.log(`[ai-agent] Executando ferramenta: ${tool}`, input);

    const result = await executeTool(tool, input || {});
    
    res.json({
      tool,
      input,
      result: JSON.parse(result),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[ai-agent] Erro ao executar ferramenta:', error);
    res.status(500).json({ 
      error: 'Falha ao executar ferramenta', 
      details: error.message 
    });
  }
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'ai-agent',
    mcp: 'enabled',
    model: 'gemini-2.0-flash',
    tools: mcpTools.length,
    timestamp: new Date().toISOString()
  });
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`[ai-agent-service] rodando na porta ${port}`);
  console.log(`[ai-agent-service] ✅ MCP (Model Context Protocol) habilitado`);
  console.log(`[ai-agent-service] 🔧 Ferramentas disponíveis: ${mcpTools.length}`);
  console.log(`[ai-agent-service] 📡 Endpoints: /api/chat, /api/tools, /api/tool/execute, /health`);
});