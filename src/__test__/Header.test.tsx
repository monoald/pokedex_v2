import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Header from '../components/molecules/Header';
import { HeaderContent } from '../types';

describe('Test Header', () => {
  const props: HeaderContent = {
    title: 'Pokemon',
    icons: [
      {
        class: 'filter_icon',
        id: 'filter',
      },
      {
        class: 'menu_icon',
        id: 'menu',
      },
    ],
  };

  let component;

  beforeEach(() => {
    component = render(<Header content={props} />);
  });

  test('should render title', () => {
    component.getByText(props.title);
  });

  test('should render 1 button', () => {
    const button = component.container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button.id).toBe(props.icons[0].id);
  });

  test('should render button`s icon', () => {
    const button = component.container.querySelector('button');
    const icon = button.firstChild;

    expect(icon).toBeInTheDocument();
    expect(icon.className).toBe(props.icons[0].class);
  });

  test('should render 2 buttons with its icons', () => {
    const buttons = component.container.querySelectorAll('button');
    const firstButton = buttons[0].id;
    const secondButton = buttons[1].id;
    const firstIcon = buttons[0].firstChild.className;
    const secondIcon = buttons[1].firstChild.className;

    expect(buttons.length).toBe(2);
    expect(firstButton).toBe(props.icons[0].id);
    expect(secondButton).toBe(props.icons[1].id);
    expect(firstIcon).toBe(props.icons[0].class);
    expect(secondIcon).toBe(props.icons[1].class);
  });
});
