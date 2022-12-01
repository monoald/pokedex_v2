import { useState } from 'react';

import { Context, State } from '../models/Context';
import { PokemonModel } from '../models/Pokemon';

import {
  getAbilities,
  getEvolutionChain,
  getNewPage,
  addPokedex,
} from '../utils/stateMethods';

const initialState = {
  pokedex: {},
  pokemon: {},
};

const useInitialState = (): Context => {
  const [state, setState] = useState<State>(initialState);

  const getPokedex = (payload: string): void => {
    if (!state.pokedex[payload]) {
      addPokedex(payload, state, setState);
    }
  };

  const getPokemonSpecifications = async (payload) => {
    const pokemon = state.pokemon[payload];

    if (!pokemon.completeSpecifications) {
      const abilitiesInfo = await getAbilities(pokemon);
      const evolutions = await getEvolutionChain(pokemon, state);

      const newData: PokemonModel = {
        ...pokemon,
        evolutions: evolutions,
        abilities: abilitiesInfo,
        completeSpecifications: true,
      };

      setState({
        ...state,
        pokemon: {
          ...state.pokemon,
          [pokemon.name]: newData,
        },
      });
    }
  };

  const nextPage = async (payload: string) => {
    const pokedex = state.pokedex[payload];

    const { newPokemons, poke } = await getNewPage(pokedex, state);

    const newData = {
      ...pokedex,
      poke: [...pokedex.poke, ...poke],
    };

    setState({
      ...state,
      pokedex: {
        ...state.pokedex,
        [payload]: {
          ...newData,
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
    getPokemonSpecifications,
  };
};

export default useInitialState;
