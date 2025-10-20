import { getData } from './api.js';

const listContainer = document.getElementById('list');
const pageInfo = document.getElementById('page-info');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

let currentPage = 1;
let totalPages = 1;
let currentSearch = ''; // guarda o termo de pesquisa

async function loadCharacters(page = 1, name = '') {
  const data = await getData('character', page, name);

  totalPages = data.info.pages;
  currentPage = page;

  // Renderiza cards como links clicáveis
  listContainer.innerHTML = data.results.map(char => `
    <a href="character.html?id=${char.id}" class="card">
      <img src="${char.image}" alt="${char.name}">
      <h3>${char.name}</h3>
    </a>
  `).join('');

  // Atualiza info de página
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

  // Habilita/desabilita botões
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Eventos dos botões de paginação
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) loadCharacters(currentPage - 1, currentSearch);
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) loadCharacters(currentPage + 1, currentSearch);
});

// Evento de pesquisa
searchBtn.addEventListener('click', () => {
  currentSearch = searchInput.value.trim();
  loadCharacters(1, currentSearch);
});

// Permite buscar apertando Enter
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    currentSearch = searchInput.value.trim();
    loadCharacters(1, currentSearch);
  }
});

// Carrega a primeira página
loadCharacters();
