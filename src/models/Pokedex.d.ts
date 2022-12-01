import { Base, Name, Description } from './Common';

export interface PokedexModel {
  descriptions: Description[];
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon_entries: PokemonEntry[];
  region: Base | null;
  version_groups: Base[];
  poke?: string[];
}

interface PokemonEntry {
  entry_number: number;
  pokemon_species: Base;
}
