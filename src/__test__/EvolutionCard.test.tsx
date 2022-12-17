import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import evolutionMock from '../__mocks__/EvolutionMock';
import contextMock from '../__mocks__/ContextMock';

import AppContext from '../context/AppContext';
import EvolutionCard from '../components/EvolutionCard';

describe('Test Evolution Card component', () => {
  const poke = contextMock.state.pokemon[evolutionMock.name];

  let component;

  beforeEach(() => {
    component = render(
      <Router>
        <AppContext.Provider value={contextMock}>
          <EvolutionCard evolution={evolutionMock} />
        </AppContext.Provider>
      </Router>,
    );
  });

  test('Should render component', () => {
    expect(component.container).toBeInTheDocument;
  });

  test('should render name', () => {
    const name = component.container.querySelector('.name').innerHTML;

    expect(name).toBe(poke.name);
  });

  test('should render types', () => {
    const types = component.container.querySelectorAll('.type');

    for (let index = 0; index < poke.types.length; index++) {
      expect(types[index].innerHTML).toBe(poke.types[index]);
      expect(types[index]).toHaveClass(`type type--${poke.types[index]}`);
    }
  });

  test('should have image', () => {
    const image = component.container.querySelector('.image');

    expect(image).toHaveAttribute('src', poke.image);
    expect(image).toHaveAttribute('alt', `Photo of ${poke.name}`);
  });

  test('should have link', () => {
    const link = component.container.querySelector('.EvolutionCard');
    expect(link).toHaveAttribute('href', `/pokemon/${poke.name}`);
  });
});
