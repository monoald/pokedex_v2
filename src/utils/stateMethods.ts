import { Item, State } from '../models/Context';
import { ItemModel } from '../models/Items';
import { PokedexModel } from '../models/Pokedex';
import {
  AbilityComplete,
  Evolutions,
  PokemonModel,
  PokemonSpecies,
  Stat,
} from '../models/Pokemon';
import { Ability } from '../models/Pokemon';

import getData from '../utils/getData';
import pad from './pad';

export const getNewPage = async (pokedex: PokedexModel, state: State) => {
  const pokemons = pokedex.pokemon_entries.splice(0, 15);

  const newPokemons = {};
  const poke = [];

  for (const pokemon of pokemons) {
    const pokemonName = pokemon.pokemon_species.name;
    poke.push(pokemon.pokemon_species.name);

    if (!state.pokemon[pokemonName]) {
      const destructuredURL = pokemon.pokemon_species.url.split('/');
      const pokemonId = destructuredURL[destructuredURL.length - 2];
      const data = await getPokemon(pokemonId);

      newPokemons[pokemonName] = data;
    }
  }

  return { newPokemons, poke };
};

export const getPokemon = async (payload: string) => {
  const pokemon = await getData(`pokemon/${payload}`);
  const species = await getData(`pokemon-species/${payload}`);

  const types = [];
  const stats = [];

  for (const type of pokemon.types) {
    types.push(type.type.name);
  }

  for (const stat of pokemon.stats) {
    stats.push(setStats(stat));
  }

  let nationalPosition = species.pokedex_numbers.find(
    (number) => number.pokedex.name == 'national',
  );
  nationalPosition = pad(nationalPosition.entry_number);
  const image = `https://www.serebii.net/pokemongo/pokemon/${nationalPosition}.png`;

  const normalizedSpecies: PokemonSpecies = {
    evolution_chain: species.evolution_chain,
    description: species.flavor_text_entries.find(
      (desc) => desc.language.name === 'en',
    ),
    is_baby: species.is_baby,
    is_legendary: species.is_legendary,
    is_mythical: species.is_mythical,
    pokedex_numbers: species.pokedex_numbers,
    capture_rate: species.capture_rate,
  };

  const normalizedPokemon: PokemonModel = {
    abilities: pokemon.abilities,
    height: pokemon.height,
    image: image,
    name: pokemon.name,
    species: normalizedSpecies,
    stats: stats,
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
): Promise<Evolutions[]> => {
  const data = await fetch(pokemon.species.evolution_chain.url).then((res) =>
    res.json(),
  );

  let evolves = true;
  let stage = data.chain;
  const evolutions: Evolutions[] = [];

  while (evolves) {
    evolutions.push({
      is_baby: stage.is_baby,
      name: stage.species.name,
      trigger: stage.evolution_details[0]?.trigger.name,
      item: stage.evolution_details[0]?.item?.name,
    });

    if (stage.evolves_to.length == 0) {
      evolves = false;
    } else if (stage.evolves_to.length > 1) {
      for (const evol of stage.evolves_to) {
        evolutions.push({
          is_baby: evol.is_baby,
          name: evol.species.name,
          trigger: evol.evolution_details[0]?.trigger.name,
          item: evol.evolution_details[0]?.item?.name,
        });
      }

      evolves = false;
    } else {
      stage = stage.evolves_to[0];
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

export const getItems = async (payload): Promise<Item> => {
  const newItems = {} as Item;

  for (const item of payload) {
    newItems[item.name] = await getItemByName(item.name);
  }

  return newItems;
};

export const getItemByName = async (itemId: string): Promise<ItemModel> => {
  const data = await getData(`item/${itemId}/`);
  return normalizeItem(data);
};

const setStats = (stat): Stat => {
  const data = {
    base_stat: stat.base_stat,
    name: stat.stat.name,
    max_stat: Math.round((stat.base_stat * 2 + 99) * 1.1),
    color: '',
  };

  switch (stat.stat.name) {
    case 'hp':
      data.name = data.name.toUpperCase();
      data.max_stat = stat.base_stat * 2 + 204;
      data.color = '#14CC60';
      break;
    case 'speed':
      data.color = '#E4C811';
      break;
    case 'attack':
      data.color = '#EF3E33';
      break;
    case 'defense':
      data.color = '#004E98';
      break;
    case 'special-attack':
      data.color = '#C589E8';
      break;
    case 'special-defense':
      data.color = '#2589BD';
      break;
  }
  return data;
};

const normalizeItem = (data): ItemModel => {
  const item = {} as ItemModel;
  item['category'] = data.category.name;
  item['cost'] = data.cost || 'can not buy';
  item['description'] = data.effect_entries.find(
    (entry) => entry.language.name === 'en',
  ).short_effect;
  item['name'] = data.name;
  item['image'] = data.sprites.default;
  return item;
};
