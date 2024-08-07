

const pokeApi = {} // contexto global

function convertPokeApiDetailToPokemon(pokeDetail) {

    const pokemon = new Pokemon

    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    const stats = pokeDetail.stats.map((stat) => stat.base_stat)

     // Máximo teórico para normalização
    const maxStatValue = 255;
    const radius = 60; // Raio do hexágono
    const centerX = 100;
    const centerY = 100;

    // Normalizar e calcular pontos
    pokemon.points = [
        [centerX, centerY - (stats[0] / maxStatValue) * radius], // HP
        [
            centerX + (stats[1] / maxStatValue) * radius * Math.cos(Math.PI / 6),
            centerY - (stats[1] / maxStatValue) * radius * Math.sin(Math.PI / 6),
        ], // Attack
        [
            centerX + (stats[2] / maxStatValue) * radius * Math.cos(Math.PI / 6),
            centerY + (stats[2] / maxStatValue) * radius * Math.sin(Math.PI / 6),
        ], // Defense
        [centerX, centerY + (stats[3] / maxStatValue) * radius], // Sp. Atk
        [
            centerX - (stats[4] / maxStatValue) * radius * Math.cos(Math.PI / 6),
            centerY + (stats[4] / maxStatValue) * radius * Math.sin(Math.PI / 6),
        ], // Sp. Def
        [
            centerX - (stats[5] / maxStatValue) * radius * Math.cos(Math.PI / 6),
            centerY - (stats[5] / maxStatValue) * radius * Math.sin(Math.PI / 6),
        ], // Speed
    ];

    pokemon.stats = stats
    pokemon.types = types
    pokemon.background_color = type

    pokemon.sprite = pokeDetail.sprites.other["official-artwork"].front_default

    pokemon.height = pokeDetail.height/10
    pokemon.weight = pokeDetail.weight/10

    return pokemon
}

function convertPokeApiSpeciesToPokemon(pokespecie) {
    const especie = new Specie

    especie.name = pokespecie.name

    especie.egg_groups = pokespecie.egg_groups

    especie.base_happiness = pokespecie.base_happiness

    especie.capture_rate = pokespecie.capture_rate

    especie.color = pokespecie.color.name

    especie.habitat = pokespecie.habitat.name

    const favor_entries = pokespecie.flavor_text_entries.filter((entry) => entry.language.name === 'en').map((entry) => entry.flavor_text)
    especie.about_text = cleanText(favor_entries[0]);

    especie.gender_rate = genderRate(pokespecie.gender_rate)

    especie.evolutionUrl = pokespecie.evolution_chain.url
    
    return especie
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)

        .catch((error) => console.log(error))
}

pokeApi.getSpeciesById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiSpeciesToPokemon)

        .catch((error) => console.log(error))
}

pokeApi.getPokemons = (offset = 0, limit = 10) =>
{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
}

pokeApi.getEvolutionChainById = (url) => {
    console.log(url)
}

function cleanText(text) {
    // Substituir '\f' e qualquer outro caractere indesejado por um espaço ou string vazia
    return text.replace(/[\f]/g, ' ').replace(/[\u0000-\u001F\u007F-\u009F]/g, ' '); 
  }

function genderRate(gender_rate)
{
    switch (gender_rate) {
        case 0:
            return [100,0];
            break;

        case 1:
            return [87.5,12.5];
            break;

        case 2:
            return [75,25];
            break;

        case 3:
            return [50,50];
            break;

        case 4:
            return [25,75];
            break;

        case 5:
            return [12.5,87.5];
            break;

        case 6:
            return [50,50];
            break;

        case 7:
            return [50,50];
            break;
        case 8:
            return [0,100];
            break;
        default:
            return['?','?'];
            break;
    }
}