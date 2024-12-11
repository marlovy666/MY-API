const container = document.getElementById('pokemon-container');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let offset = 0;
const limit = 8;

async function fetchPokemons(offset, limit) {
  container.innerHTML = '';
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await res.json();

  data.results.forEach(async (pokemon) => {
    const pokeData = await fetch(pokemon.url).then((res) => res.json());
    createCard(pokeData);
  });
}

function createCard(pokemon) {
  const abilities = pokemon.abilities.map((a) => a.ability.name).join(', ');
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>${pokemon.name}</h3>
    <p>Descripción: Un Pokémon de tipo <strong>${pokemon.types[0].type.name}</strong>.</p>
    <p>Habilidades: ${abilities}</p>
  `;
  container.appendChild(card);
}

prev.addEventListener('click', () => {
  offset -= limit;
  fetchPokemons(offset, limit);
  prev.disabled = offset <= 0;
});

next.addEventListener('click', () => {
  offset += limit;
  fetchPokemons(offset, limit);
  prev.disabled = false;
});

fetchPokemons(offset, limit);
