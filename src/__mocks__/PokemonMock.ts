const pokemonMock = {
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: 'chlorophyll',
        url: 'https://pokeapi.co/api/v2/ability/34/',
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  height: 7,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  name: 'bulbasaur',
  species: {
    evolution_chain: {
      url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
    },
    description: {
      flavor_text:
        'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
      version: {
        name: 'red',
        url: 'https://pokeapi.co/api/v2/version/1/',
      },
    },
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    capture_rate: 45,
  },
  stats: [
    {
      base_stat: 45,
      name: 'speed',
      max_stat: 255,
      color: 'black',
    },
    {
      base_stat: 45,
      name: 'speed',
      max_stat: 255,
      color: 'black',
    },
    {
      base_stat: 45,
      name: 'speed',
      max_stat: 255,
      color: 'black',
    },
  ],
  types: ['grass', 'poison'],
  weight: 69,
  completeSpecifications: false,
};

export default pokemonMock;
