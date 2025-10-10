import { getById } from './api.js';

const container = document.getElementById('detail');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function loadCharacter() {
  const ch = await getById('character', id);

  if (!ch) {
    container.innerHTML = '<p>Erro ao carregar o personagem.</p>';
    return;
  }

  // Buscar nomes dos episódios
  const episodeNames = await Promise.all(
    ch.episode.map(async url => {
      const epId = url.split('/').pop();
      const ep = await getById('episode', epId);
      return ep ? ep.name : 'Desconhecido';
    })
  );

  container.innerHTML = `
    <!-- Imagem do personagem -->
    <img class="character-image" src="${ch.image}" alt="${ch.name}">

    <!-- Duas colunas -->
    <div class="character-columns">
      <!-- Coluna de informações -->
      <div class="character-info">
        <h2>Informações</h2>
        <ul>
          <li>Nome: ${ch.name}</li>
          <li>Status: ${ch.status}</li>
          <li>Espécie: ${ch.species}</li>
          <li>Gênero: ${ch.gender}</li>
          <li>Origem: ${ch.origin.name}</li>
          <li>Localização atual: ${ch.location.name}</li>
        </ul>
      </div>

      <!-- Coluna de episódios -->
      <div class="character-episodes">
        <h2>Episódios</h2>
        <ul>
          ${episodeNames.map(name => `<li>${name}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Botão de voltar -->
    <div class="back-button">
      <a href="characters.html">Voltar</a>
    </div>
  `;
}

loadCharacter();
