import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import { PokemonCardContent } from '../types';

describe('Test Pokemon Primary Card', () => {
  const { pokemon, entryNumber }: PokemonCardContent = {
    pokemon: {
      abilities: [
        {
          ability: {
            name: 'overgrow',
            url: 'https://pokeapi.co/api/v2/ability/65/',
          },
          is_hidden: false,
          slot: 1,
        },
        {
          ability: {
            name: 'chlorophyll',
            url: 'https://pokeapi.co/api/v2/ability/34/',
          },
          is_hidden: true,
          slot: 3,
        },
      ],
      height: 7,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      name: 'bulbasaur',
      species: {
        evolution_chain: {
          url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
        },
        description: {
          flavor_text:
            'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
          language: {
            name: 'en',
            url: 'https://pokeapi.co/api/v2/language/9/',
          },
          version: {
            name: 'red',
            url: 'https://pokeapi.co/api/v2/version/1/',
          },
        },
        is_baby: false,
        is_legendary: false,
        is_mythical: false,
      },
      stats: [
        {
          base_stat: 45,
          effort: 0,
          stat: {
            name: 'hp',
            url: 'https://pokeapi.co/api/v2/stat/1/',
          },
        },
        {
          base_stat: 49,
          effort: 0,
          stat: {
            name: 'attack',
            url: 'https://pokeapi.co/api/v2/stat/2/',
          },
        },
        {
          base_stat: 49,
          effort: 0,
          stat: {
            name: 'defense',
            url: 'https://pokeapi.co/api/v2/stat/3/',
          },
        },
        {
          base_stat: 65,
          effort: 1,
          stat: {
            name: 'special-attack',
            url: 'https://pokeapi.co/api/v2/stat/4/',
          },
        },
        {
          base_stat: 65,
          effort: 0,
          stat: {
            name: 'special-defense',
            url: 'https://pokeapi.co/api/v2/stat/5/',
          },
        },
        {
          base_stat: 45,
          effort: 0,
          stat: {
            name: 'speed',
            url: 'https://pokeapi.co/api/v2/stat/6/',
          },
        },
      ],
      types: ['grass', 'poison'],
      weight: 69,
      completeSpecifications: false,
    },
    entryNumber: '1',
  };

  let component;

  beforeEach(() => {
    component = render(
      <Router>
        <PokemonCard pokemon={pokemon} entryNumber={entryNumber} />
      </Router>,
    );
  });

  test('should render component', () => {
    expect(component.container).toBeInTheDocument();
  });

  test('should render name', () => {
    const name = component.container.querySelector('.Pokemon-Card__name');

    expect(name).toBeInTheDocument();
    component.getByText(pokemon.name);
  });

  test('should render number', () => {
    const number = component.container.querySelector('.Pokemon-Card__number');

    expect(number).toBeInTheDocument();
    component.getByText(`#${entryNumber}`);
  });

  test('should have image', () => {
    const image = component.container.querySelector('.Pokemon-Card__image');
    const src = image.src;

    expect(image).toBeInTheDocument();
    expect(src).toBe(pokemon.image);
  });

  test('should have types', () => {
    const types = component.container.querySelectorAll('.type');

    expect(types.length).toBeGreaterThan(10);
  });

  test('should open page when clicked', () => {
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `${`/pokemon/${pokemon.name}`}`,
    );
  });
});
