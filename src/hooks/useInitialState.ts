import { useState } from 'react';

import { Context, State } from '../models/Context';
import { PokedexModel } from '../models/Pokedex';
import { PokemonModel } from '../models/Pokemon';

import getData from '../utils/getData';

interface GetPageInput {
  pokedex: PokedexModel;
  newPage: number;
}

interface GetPageOutput {
  page: PokemonModel[];
  newPokemons: object;
}

const initialState = {
  pokedex: {},
  pokemon: {},
};

const useInitialState = (): Context => {
  const [state, setState] = useState<State>(initialState);

  const getPokedex = (payload: string): void => {
    if (!state.pokedex[payload]) {
      addPokedex(payload);
    }
  };

  const addPokedex = async (payload: string) => {
    let pokedex = (await getData(`pokedex/${payload}`)) as PokedexModel;

    const totalPages = Math.floor(pokedex.pokemon_entries.length / 15);

    const { page, newPokemons } = await getNewPage({
      pokedex,
      newPage: 0,
    });

    pokedex = {
      ...pokedex,
      totalPages: totalPages,
      pokemons: page,
      page: 0,
    };

    setState({
      ...state,
      pokedex: { ...state.pokedex, [payload]: pokedex },
      pokemon: { ...state.pokemon, ...newPokemons },
    });
  };

  const getNewPage = async ({
    pokedex,
    newPage,
  }: GetPageInput): Promise<GetPageOutput> => {
    const start = newPage * 15 + 0;
    const end = newPage * 15 + 15;

    const pokemons = pokedex.pokemon_entries.slice(start, end);

    const page: PokemonModel[] = [];
    const newPokemons = {};

    for (const pokemon of pokemons) {
      const pokemonName = pokemon.pokemon_species.name;

      if (!state.pokemon[pokemonName]) {
        const data = (await getData(
          `pokemon-species/${pokemonName}`,
        )) as PokemonModel;

        newPokemons[pokemonName] = data;
        page.push(data);
      } else {
        page.push(state.pokemon[pokemonName]);
      }
    }

    return { page, newPokemons };
  };

  const nextPage = async (payload: string) => {
    const pokedex = state.pokedex[payload];
    const nextPage = pokedex.page + 1;

    const { page, newPokemons } = await getNewPage({
      pokedex,
      newPage: nextPage,
    });

    setState({
      ...state,
      pokedex: {
        ...state.pokedex,
        [payload]: {
          ...pokedex,
          pokemons: [...pokedex.pokemons, ...page],
          page: nextPage,
        },
      },
      pokemon: {
        ...state.pokemon,
        ...newPokemons,
      },
    });
  };

  return {
    state,
    getPokedex,
    nextPage,
  };
};

export default useInitialState;
