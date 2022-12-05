import { Base, Name, Description } from './Common';

export interface PokemonSpecies {
  base_happiness?: number;
  capture_rate?: number;
  color?: Base;
  egg_groups?: Base[];
  evolution_chain: EvolutionChain;
  evolves_from_species?: Base;
  flavor_text_entries?: FlavorTextEntry[];
  form_descriptions?: Description;
  forms_switchable?: boolean;
  gender_rate?: number;
  genera?: Genera[];
  generation?: Base;
  growth_rate?: Base;
  habitat?: Base;
  has_gender_differences?: boolean;
  hatch_counter?: number;
  id?: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name?: string;
  names?: Name[];
  order?: number;
  pal_park_encounters?: PalParkEncounter[];
  pokedex_numbers?: PokedexNumber[];
  shape?: Base;
  varieties?: Variety[];
  description: FlavorTextEntry;
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

export interface PokemonModel {
  abilities: Ability[] | AbilityComplete[];
  base_experience?: number;
  forms?: Base[];
  game_indices?: Index[];
  height: number;
  held_items?: [];
  id?: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: Mfe[];
  name: string;
  order?: number;
  past_types?: [];
  species: PokemonSpecies;
  sprites?: Sprites;
  stats: Stat[];
  types: Type[] | string[];
  weight: number;
  image: string;
  completeSpecifications: boolean;
  fullAbilities?: [];
  evolutions?: PokemonModel[];
}

export interface Ability {
  ability: Base;
  is_hidden: boolean;
  slot: number;
}

export interface AbilityComplete {
  name: string;
  description: string;
}

interface Index {
  game_index: number;
  version: Base;
}

interface Mfe {
  move: Base;
  version_group_details: VersionGroupDetail[];
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Base;
  version_group: Base;
}

interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: Other;
  versions: object;
}

interface Other {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
}

interface DreamWorld {
  front_default: string;
  front_female: string;
}

interface Home {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

interface OfficialArtwork {
  front_default: string;
}
interface Stat {
  base_stat: number;
  effort: number;
  stat: Base;
}

interface Type {
  slot: number;
  type: Base;
}
