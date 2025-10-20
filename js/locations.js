import { getData } from './api.js';

const container = document.getElementById('list');
const pageInfo = document.getElementById('page-info');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentPage = 1;
let totalPages = 1;

async function loadLocations(page = 1) {
  const data = await getData('location', page);

  totalPages = data.info.pages;
  currentPage = page;

  // Renderiza cards como links clicáveis
  container.innerHTML = data.results.map(loc => `
    <a href="location.html?id=${loc.id}" class="card">
      <img src="/API-Rick-Morty/assets/locations.jpg" alt="${loc.name}">
      <h3>${loc.name}</h3>
      <p>${loc.type}</p>
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
  if (currentPage > 1) loadLocations(currentPage - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) loadLocations(currentPage + 1);
});

// Carrega a primeira página
loadLocations();
