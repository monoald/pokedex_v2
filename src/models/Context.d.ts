import { PokedexModel } from '../models/Pokedex';
import { Evolutions, PokemonModel } from '../models/Pokemon';

export interface State {
  pokedex: Pokedex;
  pokemon: Pokemon;
  currentPokedex: string;
}

interface Pokemon {
  [key: string]: PokemonModel;
}

interface Pokedex {
  [key: string]: PokedexModel;
}

export interface Context {
  state: State;
  getPokedex: (payload: string) => void;
  getPokemonSpecifications: (payload: string) => void;
  setPokedex: (payload: string) => void;
  nextPage: (payload: string) => void;
  getPoke: (payload: string | Evolutions[]) => void;
}
