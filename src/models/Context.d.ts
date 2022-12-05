import { PokedexModel } from '../models/Pokedex';
import { PokemonModel } from '../models/Pokemon';

export interface State {
  pokedex: PokedexModel | object;
  pokemon: PokemonModel | object;
  currentPokedex: string;
}

export interface Context {
  state: State;
  getPokedex: (payload: string) => void;
  getPokemonSpecifications: (payload: string) => void;
  setPokedex: (payload: string) => void;
  nextPage: (payload: string) => void;
}
