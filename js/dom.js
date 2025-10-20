// js/dom.js
export function highlightActiveLink() {
  const links = document.querySelectorAll('header nav a');

  // pega só o arquivo atual, sem query string
  const currentFile = window.location.pathname.split('/').pop().split('?')[0];

  // mapa de páginas detalhe para lista
  const mapping = {
    'character.html': 'characters.html',
    'location.html': 'locations.html',
    'episode.html': 'episodes.html'
  };

  const targetFile = mapping[currentFile] || currentFile; // se não for detalhe, usa próprio arquivo

  links.forEach(link => {
    const linkFile = link.getAttribute('href').split('/').pop();
    if (linkFile === targetFile) {
      link.classList.add('active');
    }
  });
}
