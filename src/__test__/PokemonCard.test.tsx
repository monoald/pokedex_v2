import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import pokemonMock from '../__mocks__/PokemonMock';

import PokemonCard from '../components/PokemonCard';

describe('Test Pokemon Primary Card', () => {
  const entryNumber = 0;

  let component;

  beforeEach(() => {
    component = render(
      <Router>
        <PokemonCard pokemon={pokemonMock} entryNumber={entryNumber} />
      </Router>,
    );
  });

  test('should render component', () => {
    expect(component.container).toBeInTheDocument();
  });

  test('should render name', () => {
    const name = component.container.querySelector('.name');

    expect(name).toBeInTheDocument();
    component.getByText(pokemonMock.name);
  });

  test('should render number', () => {
    const number = component.container.querySelector('.number');

    expect(number).toBeInTheDocument();
    component.getByText(`#${entryNumber + 1}`);
  });

  test('should have image', () => {
    const image = component.container.querySelector('.image');
    const src = image.src;

    expect(image).toBeInTheDocument();
    expect(src).toBe(pokemonMock.image);
  });

  test('should have types', () => {
    const types = component.container.querySelectorAll('.type');

    expect(types.length).toBeGreaterThan(1);
  });

  test('should open page when clicked', () => {
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `${`/pokemon/${pokemonMock.name}`}`,
    );
  });
});
