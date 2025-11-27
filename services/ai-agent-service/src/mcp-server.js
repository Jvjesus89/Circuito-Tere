/**
 * Model Context Protocol (MCP) Server
 * Expõe os microserviços como ferramentas para serem usadas pelo Gemini
 */

import fetch from 'node-fetch';

const MICROSERVICES = {
  usuarios: process.env.USUARIOS_SERVICE_URL || 'http://usuarios-service:3001',
  parques: process.env.PARQUES_SERVICE_URL || 'http://parques-service:3002',
  trilhas: process.env.TRILHAS_SERVICE_URL || 'http://parques-service:3002',
  eventos: process.env.EVENTOS_SERVICE_URL || 'http://eventos-service:3003',
  avaliacao: process.env.AVALIACAO_SERVICE_URL || 'http://avaliacao-service:3004'
};

/**
 * Ferramentas MCP disponíveis
 * Cada ferramenta representa um recurso acessível via API
 */
export const mcpTools = [
  {
    name: 'list_usuarios',
    description: 'Lista todos os usuários cadastrados no sistema',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'get_usuario',
    description: 'Obtém informações detalhadas de um usuário específico',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'ID do usuário'
        }
      },
      required: ['id']
    }
  },
  {
    name: 'list_parques',
    description: 'Lista todos os parques disponíveis',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'get_parque',
    description: 'Obtém informações detalhadas de um parque específico',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'ID do parque'
        }
      },
      required: ['id']
    }
  },
  {
    name: 'list_trilhas',
    description: 'Lista todas as trilhas disponíveis',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'get_trilha',
    description: 'Obtém informações detalhadas de uma trilha específica',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'ID da trilha'
        }
      },
      required: ['id']
    }
  },
  {
    name: 'list_eventos',
    description: 'Lista todos os eventos cadastrados',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'get_evento',
    description: 'Obtém informações detalhadas de um evento específico',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'ID do evento'
        }
      },
      required: ['id']
    }
  },
  {
    name: 'list_avaliacoes',
    description: 'Lista todas as avaliações do sistema',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'get_avaliacao',
    description: 'Obtém informações de uma avaliação específica',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'ID da avaliação'
        }
      },
      required: ['id']
    }
  }
];

/**
 * Executa uma ferramenta MCP
 * @param {string} toolName - Nome da ferramenta a executar
 * @param {object} toolInput - Parâmetros de entrada da ferramenta
 * @returns {Promise<string>} Resultado da execução
 */
export async function executeTool(toolName, toolInput) {
  try {
    switch (toolName) {
      case 'list_usuarios':
        return await fetchAPI(`${MICROSERVICES.usuarios}/api/usuarios`);
      
      case 'get_usuario':
        if (!toolInput.id) throw new Error('ID do usuário é obrigatório');
        return await fetchAPI(`${MICROSERVICES.usuarios}/api/usuarios/${toolInput.id}`);
      
      case 'list_parques':
        return await fetchAPI(`${MICROSERVICES.parques}/api/parques`);
      
      case 'get_parque':
        if (!toolInput.id) throw new Error('ID do parque é obrigatório');
        return await fetchAPI(`${MICROSERVICES.parques}/api/parques/${toolInput.id}`);
      
      case 'list_trilhas':
        return await fetchAPI(`${MICROSERVICES.trilhas}/api/trilhas`);
      
      case 'get_trilha':
        if (!toolInput.id) throw new Error('ID da trilha é obrigatório');
        return await fetchAPI(`${MICROSERVICES.trilhas}/api/trilhas/${toolInput.id}`);
      
      case 'list_eventos':
        return await fetchAPI(`${MICROSERVICES.eventos}/api/eventos`);
      
      case 'get_evento':
        if (!toolInput.id) throw new Error('ID do evento é obrigatório');
        return await fetchAPI(`${MICROSERVICES.eventos}/api/eventos/${toolInput.id}`);
      
      case 'list_avaliacoes':
        return await fetchAPI(`${MICROSERVICES.avaliacao}/api/avaliacao`);
      
      case 'get_avaliacao':
        if (!toolInput.id) throw new Error('ID da avaliação é obrigatório');
        return await fetchAPI(`${MICROSERVICES.avaliacao}/api/avaliacao/${toolInput.id}`);
      
      default:
        throw new Error(`Ferramenta desconhecida: ${toolName}`);
    }
  } catch (error) {
    console.error(`[MCP] Erro ao executar ${toolName}:`, error.message);
    return JSON.stringify({ error: error.message });
  }
}

/**
 * Faz uma requisição HTTP para um microserviço
 * @param {string} url - URL do endpoint
 * @returns {Promise<string>} Resposta JSON como string
 */
async function fetchAPI(url) {
  try {
    console.log(`[MCP] Buscando: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    throw new Error(`Falha ao acessar ${url}: ${error.message}`);
  }
}

/**
 * Processa mensagens com suporte a tool use
 * Verifica se há chamadas de ferramenta e as executa
 * @param {object} toolUseBlock - Bloco de tool use da resposta do Gemini
 * @returns {Promise<string>} Resultado da execução da ferramenta
 */
export async function processToolUse(toolUseBlock) {
  if (!toolUseBlock.toolUse || !toolUseBlock.toolUse.name) {
    throw new Error('Bloco de tool use inválido');
  }

  const { name, input } = toolUseBlock.toolUse;
  console.log(`[MCP] Executando ferramenta: ${name}`, input);
  
  return await executeTool(name, input);
}
