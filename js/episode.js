import { getById } from './api.js';

const container = document.getElementById('detail');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function loadEpisode() {
  const ep = await getById('episode', id);

  if (!ep) {
    container.innerHTML = '<p>Erro ao carregar o episódio.</p>';
    return;
  }

  // Buscar nomes dos personagens
  const characterNames = await Promise.all(
    ep.characters.map(async url => {
      const charId = url.split('/').pop();
      const character = await getById('character', charId);
      return character ? character.name : 'Desconhecido';
    })
  );

  container.innerHTML = `
    <div class="episode-container">
      <!-- Coluna de informações do episódio -->
      <div class="episode-info">
        <h2>Informações do Episódio</h2>
        <ul>
          <li>Nome: ${ep.name}</li>
          <li>Código do episódio: ${ep.episode}</li>
          <li>Data de exibição: ${ep.air_date}</li>
        </ul>
      </div>

      <!-- Coluna de personagens -->
      <div class="episode-characters">
        <h2>Personagens</h2>
        <ul>
          ${characterNames.map(name => `<li>${name}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Botão de voltar -->
    <div class="back-button">
      <a href="episodes.html">Voltar</a>
    </div>
  `;
}

loadEpisode();
