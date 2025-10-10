import { getById } from './api.js';

const container = document.getElementById('detail');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function loadLocation() {
  const loc = await getById('location', id);

  if (!loc) {
    container.innerHTML = '<p>Erro ao carregar a localização.</p>';
    return;
  }

  // Buscar nomes dos personagens residentes
  const residentNames = await Promise.all(
    loc.residents.map(async url => {
      const charId = url.split('/').pop();
      const character = await getById('character', charId);
      return character ? character.name : 'Desconhecido';
    })
  );

  container.innerHTML = `
    <div class="location-container">
      <!-- Coluna de informações da localização -->
      <div class="location-info">
        <h2>Informações da Localização</h2>
        <ul>
          <li>Nome: ${loc.name}</li>
          <li>Tipo: ${loc.type}</li>
          <li>Dimensão: ${loc.dimension}</li>
        </ul>
      </div>

      <!-- Coluna de residentes -->
      <div class="location-residents">
        <h2>Personagens Residentes</h2>
        <ul>
          ${residentNames.map(name => `<li>${name}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Botão de voltar -->
    <div class="back-button">
      <a href="locations.html">Voltar</a>
    </div>
  `;
}

loadLocation();
