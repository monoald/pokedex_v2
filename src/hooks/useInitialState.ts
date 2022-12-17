import { useState } from 'react';

import { Context, State } from '../models/Context';
import { Evolutions, PokemonModel } from '../models/Pokemon';

import {
  getAbilities,
  getEvolutionChain,
  getNewPage,
  addPokedex,
  getPokemon,
} from '../utils/stateMethods';

const initialState = {
  pokedex: {},
  pokemon: {},
  currentPokedex: 'kanto',
} as State;

const useInitialState = (): Context => {
  const [state, setState] = useState<State>(initialState);

  const getPokedex = (payload: string): void => {
    if (!state.pokedex[payload]) {
      console.log('chau');

      addPokedex(payload, state, setState);
    }
  };

  const getPokemonSpecifications = async (
    pokemonName: string,
    pokemonObject?: PokemonModel,
  ) => {
    const pokemon = state.pokemon[pokemonName] || pokemonObject;

    if (!pokemon.completeSpecifications) {
      const abilitiesInfo = await getAbilities(pokemon);
      const evolutions = await getEvolutionChain(pokemon, state);

      const newData: PokemonModel = {
        ...pokemon,
        evolutions: evolutions,
        abilities: abilitiesInfo,
        completeSpecifications: true,
      };

      if (pokemonObject) {
        return newData;
      } else {
        setState({
          ...state,
          pokemon: {
            ...state.pokemon,
            [pokemon.name]: newData,
          },
        });
      }
    }
  };

  const setPokedex = (payload: string) => {
    setState({
      ...state,
      currentPokedex: payload,
    });
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

  const getPoke = async (payload: string | Evolutions[]) => {
    if (typeof payload === 'string') {
      const data = await getPokemon(payload);
      const normalizedData = await getPokemonSpecifications(payload, data);

      setState({
        ...state,
        pokemon: { ...state.pokemon, [payload]: normalizedData },
      });
    } else {
      const pokemons = {};

      for (const pokemon in payload) {
        const name = payload[pokemon].name;

        if (state.pokemon[name]) {
          continue;
        }

        const data = await getPokemon(name);
        pokemons[name] = data;
      }

      setState({
        ...state,
        pokemon: { ...state.pokemon, ...pokemons },
      });
    }
  };

  return {
    state,
    getPokedex,
    getPokemonSpecifications,
    setPokedex,
    nextPage,
    getPoke,
  };
};

export default useInitialState;
