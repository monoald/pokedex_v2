import { State } from '../models/Context';

import { PokedexModel } from '../models/Pokedex';
import {
  AbilityComplete,
  PokemonModel,
  PokemonSpecies,
} from '../models/Pokemon';
import { Ability } from '../models/Pokemon';

import getData from '../utils/getData';

export const getNewPage = async (pokedex: PokedexModel, state: State) => {
  const pokemons = pokedex.pokemon_entries.splice(0, 15);

  const newPokemons = {};
  const poke = [];

  for (const pokemon of pokemons) {
    const pokemonName = pokemon.pokemon_species.name;
    poke.push(pokemon.pokemon_species.name);

    if (!state.pokemon[pokemonName]) {
      const data = await getPokemon(pokemonName);

      newPokemons[pokemonName] = data;
    }
  }

  return { newPokemons, poke };
};

const getPokemon = async (payload: string) => {
  const pokemon: PokemonModel = await getData(`pokemon/${payload}`);
  const species = await getData(`pokemon-species/${payload}`);

  const types = [];

  for (const type of pokemon.types) {
    types.push(type.type.name);
  }

  const normalizedSpecies: PokemonSpecies = {
    evolution_chain: species.evolution_chain,
    description: species.flavor_text_entries.find(
      (desc) => desc.language.name === 'en',
    ),
    is_baby: species.is_baby,
    is_legendary: species.is_legendary,
    is_mythical: species.is_mythical,
    pokedex_numbers: species.pokedex_numbers,
  };

  const normalizedPokemon: PokemonModel = {
    abilities: pokemon.abilities,
    height: pokemon.height,
    image: pokemon.sprites.other['official-artwork'].front_default,
    name: pokemon.name,
    species: normalizedSpecies,
    stats: pokemon.stats,
    types: types,
    weight: pokemon.weight,
    completeSpecifications: false,
  };

  return normalizedPokemon;
};

export const getAbilities = async (
  pokemon: PokemonModel,
): Promise<AbilityComplete[]> => {
  const abilities = pokemon.abilities as Ability[];

  const newAbilities = [];

  for (const ability of abilities) {
    const data = await getData(`ability/${ability.ability.name}`);

    const normalidezData = {
      name: data.name,
      description: data.flavor_text_entries.find(
        (desc) => desc.language.name === 'en',
      ).flavor_text,
    };

    newAbilities.push(normalidezData);
  }

  return newAbilities;
};

export const getEvolutionChain = async (
  pokemon: PokemonModel,
  state: State,
): Promise<PokedexModel[]> => {
  const data = await fetch(pokemon.species.evolution_chain.url).then((res) =>
    res.json(),
  );

  let evolves = true;
  let stage = data.chain;
  const evolutions = [];

  while (evolves) {
    evolutions.push(state.pokemon[stage.species.name]);
    if (stage.evolves_to.length !== 0) {
      stage = stage.evolves_to[0];
    } else {
      evolves = false;
    }
  }

  return evolutions;
};

export const addPokedex = async (
  pokedexName: string,
  state: State,
  setState: React.Dispatch<React.SetStateAction<State>>,
) => {
  let pokedex = (await getData(`pokedex/${pokedexName}`)) as PokedexModel;

  const { newPokemons, poke } = await getNewPage(pokedex, state);

  pokedex = {
    ...pokedex,
    poke: poke,
  };

  setState({
    ...state,
    pokedex: { ...state.pokedex, [pokedexName]: pokedex },
    pokemon: { ...state.pokemon, ...newPokemons },
  });
};
