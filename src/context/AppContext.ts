import { createContext } from 'react';
import { Context } from '../models/Context';

const AppContext = createContext<Context>({
  state: {
    pokedex: {},
    pokemon: {},
  },
  getPokedex: () => console.log('Hi'),
  nextPage: () => console.log('Hi'),
});

export default AppContext;
