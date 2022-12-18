import { createContext } from 'react';
import { Context } from '../models/Context';

const AppContext = createContext<Context>({
  state: {
    pokedex: {},
    pokemon: {},
    currentPokedex: '',
  },
  getPokedex: () => {
    return;
  },
  getPokemonSpecifications: () => {
    return;
  },
  setPokedex: () => {
    return;
  },
  nextPage: () => {
    return;
  },
  getPoke: () => {
    return;
  },
});

export default AppContext;
