const pokemonList = document.getElementById('pokemonList');
const LoadMoreButton = document.getElementById('LoadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => 
            `
                <li class="pokemon ${pokemon.background_color}" data-id="${pokemon.number}" >
                    <div class="info">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
                    </div>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.sprite}" alt="${pokemon.name}">
                    </div>
                </li>
            `).join('');

        pokemonList.innerHTML += newHTML;
        detalhesPokemonEvent(); 
    });
}

loadPokemonItens(offset, limit);

LoadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordsNextPage = offset + limit;

    if(qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;

        loadPokemonItens(offset, newLimit);

        LoadMoreButton.parentElement.removeChild(LoadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});
