import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import Footer from '../components/Footer';

describe('Test Footer component', () => {
  let component;

  beforeEach(() => {
    component = render(<Footer />);
  });

  test('should render component', () => {
    expect(component.container).toBeInTheDocument();
  });

  test('should render content', () => {
    const title = component.container.querySelector('p');

    expect(title).toBeInTheDocument();
  });

  test('should have anchor', () => {
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://monoald.github.io/',
    );
  });
});
