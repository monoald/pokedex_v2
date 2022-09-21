import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { CardMenuContent } from '../types';
import CardMenu from '../components/atoms/CardMenu';

describe('Test Card Primary component', () => {
  const props: CardMenuContent = {
    title: 'Pokemons',
    image: 'card-menu-image-1',
    url: 'im an url',
  };

  let component;

  beforeEach(() => {
    component = render(
      <Router>
        <CardMenu cardMenuContent={props} />
      </Router>,
    );
  });

  test('should render component', () => {
    expect(component.container).toBeInTheDocument();
  });

  test('should render card title with content', () => {
    const title = component.container.querySelector('h2');

    expect(title).toBeInTheDocument();
    component.getByText(props.title);
  });

  test('should render card icon', () => {
    const span = component.container.querySelector('span');
    const spanIcon = span.className;

    expect(spanIcon).toBe(`${props.image} CardMenu__image`);
  });

  test('should move to page when clicked', () => {
    expect(screen.getByRole('link')).toHaveAttribute('href', `/${props.url}`);
  });
});