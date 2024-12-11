const input = document.getElementById('anime-input');
const btn = document.getElementById('search-btn');
const results = document.getElementById('anime-results');

btn.addEventListener('click', async () => {
  const query = input.value.trim();
  if (!query) return;
  results.innerHTML = '';
  
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
  const data = await res.json();

  data.data.forEach(anime => {
    createAnimeCard(anime);
  });
});

function createAnimeCard(anime) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
    <h3>${anime.title}</h3>
    <p>${anime.synopsis ? anime.synopsis.slice(0, 100) + '...' : 'Sin descripción disponible.'}</p>
    <a href="${anime.url}" target="_blank">Ver más</a>
  `;
  results.appendChild(card);
}
