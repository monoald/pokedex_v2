import { Base, Name, Description } from './Common';

export interface PokemonModel {
  base_happiness: number;
  capture_rate: number;
  color: Base;
  egg_groups: Base[];
  evolution_chain: EvolutionChain;
  evolves_from_species: Base;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: Description;
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genera[];
  generation: Base;
  growth_rate: Base;
  habitat: Base;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Base;
  varieties: Variety[];
}

interface EvolutionChain {
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Base;
  version: Base;
}

interface Genera {
  genus: string;
  language: Base;
}

interface PalParkEncounter {
  area: Base;
  base_score: number;
  rate: number;
}

interface PokedexNumber {
  entry_number: number;
  pokedex: Base;
}

interface Variety {
  is_default: boolean;
  pokemon: Base;
}
