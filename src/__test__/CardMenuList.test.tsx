import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import CardListMock from '../__mocks__/MenuCardListMock';

import CardMenuList from '../containers/CardMenuList';

describe('test Card Menu List component', () => {
  let component;

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
    component.getByText(CardListMock.cardMenu[0].title);
    expect(cardImage.className).toBe(
      `${CardListMock.cardMenu[0].image} CardMenu__image`,
    );
    expect(card).toHaveAttribute('href', `/${CardListMock.cardMenu[0].url}`);
  });

  test('should render many cards', () => {
    const cards = component.container.querySelectorAll('a');
    const lastCard = cards[cards.length - 1];
    const lastCardImage = lastCard.lastChild;

    expect(cards.length).toBe(CardListMock.cardMenu.length);
    component.getByText(
      CardListMock.cardMenu[CardListMock.cardMenu.length - 1].title,
    );
    expect(lastCardImage.className).toBe(
      `${
        CardListMock.cardMenu[CardListMock.cardMenu.length - 1].image
      } CardMenu__image`,
    );
    expect(lastCard).toHaveAttribute(
      'href',
      `/${CardListMock.cardMenu[CardListMock.cardMenu.length - 1].url}`,
    );
  });
});
