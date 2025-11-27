/**
 * Exemplos de uso do AI Agent Service com MCP
 * Rode este arquivo com: node test-mcp.js
 */

const BASE_URL = 'http://localhost:3005';

/**
 * Exemplo 1: Listar ferramentas disponíveis
 */
async function exemplo1_listarFerramentas() {
  console.log('\n=== Exemplo 1: Listar Ferramentas ===');
  try {
    const response = await fetch(`${BASE_URL}/api/tools`);
    const data = await response.json();
    console.log(`Total de ferramentas: ${data.totalTools}`);
    data.tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

/**
 * Exemplo 2: Executar ferramenta diretamente
 */
async function exemplo2_executarFerramenta() {
  console.log('\n=== Exemplo 2: Executar Ferramenta Diretamente ===');
  try {
    const response = await fetch(`${BASE_URL}/api/tool/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'list_parques',
        input: {}
      })
    });
    const data = await response.json();
    console.log('Parques:', JSON.stringify(data.result, null, 2));
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

/**
 * Exemplo 3: Chat com Gemini usando MCP
 */
async function exemplo3_chatComGemini() {
  console.log('\n=== Exemplo 3: Chat com Gemini ===');
  try {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'Quantos usuários estão cadastrados no sistema?'
      })
    });
    const data = await response.json();
    console.log('Resposta do Gemini:');
    console.log(data.response);
    console.log(`\nFerramentas habilitadas: ${data.tools_enabled}`);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

/**
 * Exemplo 4: Health check
 */
async function exemplo4_healthCheck() {
  console.log('\n=== Exemplo 4: Health Check ===');
  try {
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();
    console.log(`Status: ${data.status}`);
    console.log(`Serviço: ${data.service}`);
    console.log(`MCP: ${data.mcp}`);
    console.log(`Modelo: ${data.model}`);
    console.log(`Ferramentas disponíveis: ${data.tools}`);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

/**
 * Exemplo 5: Obter usuário específico
 */
async function exemplo5_obterUsuario() {
  console.log('\n=== Exemplo 5: Obter Usuário por ID ===');
  try {
    const response = await fetch(`${BASE_URL}/api/tool/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'get_usuario',
        input: { id: 1 }
      })
    });
    const data = await response.json();
    if (data.result.error) {
      console.log('Usuário não encontrado');
    } else {
      console.log('Dados do usuário:', JSON.stringify(data.result, null, 2));
    }
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

/**
 * Exemplo 6: Query complexa ao Gemini
 */
async function exemplo6_queryComplexa() {
  console.log('\n=== Exemplo 6: Query Complexa ao Gemini ===');
  try {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'Mostre todos os parques cadastrados e suas trilhas associadas.'
      })
    });
    const data = await response.json();
    console.log('Resposta do Gemini:');
    console.log(data.response);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

/**
 * Executar todos os exemplos
 */
async function executarTodos() {
  console.log('🤖 Testando AI Agent Service com MCP\n');
  console.log('Certifique-se de que:');
  console.log('1. O ai-agent-service está rodando na porta 3005');
  console.log('2. GOOGLE_API_KEY está configurada');
  console.log('3. Os microserviços estão rodando\n');

  await exemplo1_listarFerramentas();
  await exemplo2_executarFerramenta();
  await exemplo4_healthCheck();
  await exemplo5_obterUsuario();
  
  // Exemplos com Gemini (requerem chave válida)
  // await exemplo3_chatComGemini();
  // await exemplo6_queryComplexa();

  console.log('\n✅ Testes concluídos!\n');
}

// Executar
executarTodos().catch(console.error);
