import { PokedexModel } from '../models/Pokedex';
import { PokemonModel } from '../models/Pokemon';

export interface State {
  pokedex: PokedexModel | object;
  pokemon: PokemonModel | object;
}

export interface Context {
  state: State;
  getPokedex: (payload: string) => void;
  nextPage: (payload: string) => void;
}
