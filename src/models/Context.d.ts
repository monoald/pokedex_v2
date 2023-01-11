import { PokedexModel } from '../models/Pokedex';
import { Evolutions, PokemonModel } from '../models/Pokemon';
import { ItemModel } from './Items';

export interface State {
  pokedex: Pokedex;
  pokemon: Pokemon;
  currentPokedex: string;
  items: Item;
  currentItemPage: any;
}

interface Pokemon {
  [key: string]: PokemonModel;
}

interface Pokedex {
  [key: string]: PokedexModel;
}

export interface Item {
  [key: string]: ItemModel;
}

interface NextPagePayload {
  pokedexName: string;
  setIntersecting: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Context {
  state: State;
  getPokedex: (payload: string) => void;
  getPokemonSpecifications: (payload: string) => void;
  setPokedex: (payload: string) => void;
  nextPagePokedex: (payload: NextPagePayload) => void;
  getPoke: (payload: string | Evolutions[]) => void;
  setCurrentPokedex: (payload: string) => void;
  getItemsFirstPage: () => Promise<void>;
  getItem: (payload: string) => Promise<void>;
  nextPageItem: (
    payload: React.Dispatch<React.SetStateAction<boolean>>,
  ) => Promise<void>;
}
