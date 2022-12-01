import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import CardMenuList from '../containers/CardMenuList';

describe('test Card Menu List component', () => {
  let component;

  const props = {
    header: { title: 'Pokedex' },
    cardMenu: [
      {
        title: 'Pokemons',
        image: 'image-1',
        url: 'pokedex',
      },
      {
        title: 'Items',
        image: 'image-2',
        url: 'items',
      },
      {
        title: 'Moves',
        image: 'image-3',
        url: 'moves',
      },
      {
        title: 'Your Team',
        image: 'image-4',
        url: 'your-team',
      },
    ],
  };

  beforeEach(() => {
    component = render(
      <Router>
        <CardMenuList />
      </Router>,
    );
  });

  test('should render component', () => {
    expect(component.container).toBeInTheDocument();
  });

  test('should render 1 card', () => {
    const card = component.container.querySelector('a');
    const cardImage = card.lastChild;

    expect(card).toBeInTheDocument();
    component.getByText(props.cardMenu[0].title);
    expect(cardImage.className).toBe(
      `${props.cardMenu[0].image} CardMenu__image`,
    );
    expect(card).toHaveAttribute('href', `/${props.cardMenu[0].url}`);
  });

  test('should render many cards', () => {
    const cards = component.container.querySelectorAll('a');
    const lastCard = cards[cards.length - 1];
    const lastCardImage = lastCard.lastChild;

    expect(cards.length).toBe(props.cardMenu.length);
    component.getByText(props.cardMenu[props.cardMenu.length - 1].title);
    expect(lastCardImage.className).toBe(
      `${props.cardMenu[props.cardMenu.length - 1].image} CardMenu__image`,
    );
    expect(lastCard).toHaveAttribute(
      'href',
      `/${props.cardMenu[props.cardMenu.length - 1].url}`,
    );
  });
});
