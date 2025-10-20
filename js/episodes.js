import { getData } from './api.js';

const container = document.getElementById('list');
const pageInfo = document.getElementById('page-info');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentPage = 1;
let totalPages = 1;

async function loadEpisodes(page = 1) {
  const data = await getData('episode', page);

  totalPages = data.info.pages;
  currentPage = page;

  // Renderiza cards como links clicáveis
  container.innerHTML = data.results.map(ep => `
    <a href="episode.html?id=${ep.id}" class="card">
      <img src="/API-Rick-Morty/assets/episodes.jpg" alt="${ep.name}">
      <h3>${ep.name}</h3>
      <p>${ep.episode}</p>
      <p>${ep.air_date}</p>
    </a>
  `).join('');

  // Atualiza info de página
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

  // Habilita/desabilita botões
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Eventos dos botões
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) loadEpisodes(currentPage - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) loadEpisodes(currentPage + 1);
});

// Carrega a primeira página
loadEpisodes();
