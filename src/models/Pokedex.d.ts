import { Base, Name, Description } from './Common';
import { PokemonModel } from './Pokemon';

export interface PokedexModel {
  descriptions: Description[];
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon_entries: PokemonEntry[];
  region: Base | null;
  version_groups: Base[];
  totalPages?: number;
  pokemons?: PokemonModel[];
  page?: number;
}

interface PokemonEntry {
  entry_number: number;
  pokemon_species: Base;
}
