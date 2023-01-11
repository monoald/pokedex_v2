import { useState } from 'react';

import { Context, NextPagePayload, State } from '../models/Context';
import { Evolutions, PokemonModel } from '../models/Pokemon';

import {
  getAbilities,
  getEvolutionChain,
  getNewPage,
  addPokedex,
  getPokemon,
  getItemByName,
  getItems,
} from '../utils/stateMethods';
import getData from '../utils/getData';

const initialState = {
  pokedex: {},
  pokemon: {},
  currentPokedex: 'kanto',
  items: {},
  currentItemPage: {},
} as State;

const useInitialState = (): Context => {
  const [state, setState] = useState<State>(initialState);

  const getPokedex = (payload: string): void => {
    if (!state.pokedex[payload]) {
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
      const evolutions = await getEvolutionChain(pokemon);

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

  const nextPagePokedex = async (payload: NextPagePayload) => {
    const { pokedexName, setIntersecting } = payload;
    const pokedex = state.pokedex[pokedexName];

    const { newPokemons, poke } = await getNewPage(pokedex, state);

    const newData = {
      ...pokedex,
      poke: [...pokedex.poke, ...poke],
    };

    setState({
      ...state,
      pokedex: {
        ...state.pokedex,
        [payload.pokedexName]: {
          ...newData,
        },
      },
      pokemon: {
        ...state.pokemon,
        ...newPokemons,
      },
    });
    setIntersecting(false);
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

  const setCurrentPokedex = (payload: string): void => {
    setState({
      ...state,
      currentPokedex: payload,
    });
  };

  const getItemsFirstPage = async () => {
    const data = await getData('item');
    const newItems = await getItems(data.results);

    setState({
      ...state,
      items: { ...state.items, ...newItems },
      currentItemPage: data,
    });
  };

  const getItem = async (payload: string) => {
    const item = await getItemByName(payload);

    setState({
      ...state,
      items: { ...state.items, [payload]: item },
    });
  };

  const nextPageItem = async (
    payload: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const data = await fetch(state.currentItemPage.next).then((res) =>
      res.json(),
    );
    const newItems = await getItems(data.results);

    setState({
      ...state,
      items: { ...state.items, ...newItems },
      currentItemPage: data,
    });

    payload(false);
  };

  return {
    state,
    getPokedex,
    getPokemonSpecifications,
    setPokedex,
    nextPagePokedex,
    getPoke,
    setCurrentPokedex,
    getItemsFirstPage,
    getItem,
    nextPageItem,
  };
};

export default useInitialState;
