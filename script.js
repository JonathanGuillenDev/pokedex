const poke_container = document.getElementById('poke-container')
const pokemon_count = 151
const colors = {
    fire: 'linear-gradient(to bottom right, #FFD6BD,#F78431,#8C4A18)',
    grass: 'linear-gradient(to bottom right, #D6EFC6,#7BCE52,#224411)',
	electric: 'linear-gradient(to bottom right, #FFE794,#FFD631,#947B18)',
	water: 'linear-gradient(to bottom right, #CEDEFF,#6B94F7,#39528C)',
	ground: 'linear-gradient(to bottom right, #E0B890,#AC845C,#805840)',
	rock: 'linear-gradient(to bottom right, #CEC6A5,#A5944A,#5A5229)',
	fairy: 'linear-gradient(to bottom right, #F8DFF8,#F5BAD9,#C171A2)',
	poison: 'linear-gradient(to bottom right, #F0D0F8,#E090F8,#B848E0)',
	bug: 'linear-gradient(to bottom right, #CED6A5,#A5AD4A,#636B29)',
	dragon: 'linear-gradient(to bottom right, #6898F8,#B084B4,#F87070)',
	psychic: 'linear-gradient(to bottom right, #F8C0B0,#F85888,#906060)',
	flying: 'linear-gradient(to bottom right, #B8E8F8,#58C8F0,#30A0B8)',
	fighting: 'linear-gradient(to bottom right, #F8B8A0,#D47C64,#984838)',
	normal: 'linear-gradient(to bottom right, #E8E8D8,#B8B8A8,#989078)'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString()
    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const uppercase_type = type[0].toUpperCase() + type.slice(1)
    const color = colors[type]
    const xp = pokemon.base_experience
    const poke_stats = pokemon.stats.map(bstat => bstat.base_stat)
    const hp = poke_stats[0]
    const attack = poke_stats[1]
    const defense = poke_stats[2]
    const special_attack = poke_stats[3]
    const special_defense = poke_stats[4]
    const speed = poke_stats[5]

    pokemonEl.style.background = color

    const pokemonInnerHTML = `
    <p class="species">${uppercase_type}</p>
    <h3 class="name">${name}</h3><p class="hp">${hp} HP</p>
    <div class="img-container"> 
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <div class="stats">
            <div class="left">
            <p class="type">Attack</p>
        <p class="type">Defense</p>
        <p class="type">Speed</p></div>
            <div class="right">
            <p class="type">${attack}</p>
        <p class="type">${defense}</p>
        <p class="type">${speed}</p>
        </div>
        </div>
        <hr>
        <p class="typesmall">Special Attack    ${special_attack}</p>
        <p class="typesmall">Special Defense    ${special_defense}</p>
        <hr>
        <p class="xp">${xp}  XP</p>
        <p class="number">${id} / 150</p>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()