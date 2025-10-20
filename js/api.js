const BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Busca uma lista de itens de um endpoint específico
 * @param {string} endpoint - "character", "location" ou "episode"
 * @param {number} page - número da página para paginação
 * @param {string} [name] - termo de pesquisa para filtrar por nome (opcional)
 * @returns {Promise<Object>} - objeto com results e info, ou fallback em caso de erro
 */
export async function getData(endpoint, page = 1, name = '') {
  let url = `${BASE_URL}/${endpoint}?page=${page}`;
  if (name) url += `&name=${encodeURIComponent(name)}`;

  const res = await fetch(url).catch(err => {
    console.error(`Erro de rede ao buscar ${endpoint}:`, err);
    return null;
  });

  if (!res || !res.ok) {
    console.error(`Erro ao buscar ${endpoint}${res ? ` (status ${res.status})` : ''}`);
    return { results: [], info: {} }; // fallback
  }

  return res.json();
}

/**
 * Busca um item específico pelo ID
 * @param {string} endpoint - "character", "location" ou "episode"
 * @param {number|string} id - ID do item
 * @returns {Promise<Object|null>} - objeto com os dados do item ou null em caso de erro
 */
export async function getById(endpoint, id) {
  const res = await fetch(`${BASE_URL}/${endpoint}/${id}`).catch(err => {
    console.error(`Erro de rede ao buscar ${endpoint} com ID ${id}:`, err);
    return null;
  });

  if (!res || !res.ok) {
    console.error(`Erro ao buscar ${endpoint} com ID ${id}${res ? ` (status ${res.status})` : ''}`);
    return null; // fallback
  }

  return res.json();
}
