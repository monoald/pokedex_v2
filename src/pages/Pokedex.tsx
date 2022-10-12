import React, { useState } from 'react';

import { HeaderContent } from '../types';

import Header from '../components/molecules/Header';

import useToggle from '../hooks/useToggle';
import Menu from '../components/organisms/Menu';

const Pokedex = () => {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const filterEvent = () => {
    useToggle(setToggleFilter, toggleFilter);
  };

  const menuEvent = () => {
    useToggle(setToggleMenu, toggleMenu);
  };

  const content: HeaderContent = {
    title: 'Pokedex',
    icons: [
      {
        class: 'filter_icon',
        id: 'filter',
        event: filterEvent,
      },
      {
        class: 'menu_icon',
        id: 'menu',
        event: menuEvent,
      },
    ],
  };

  return (
    <>
      <Header content={content} />
      <main>{toggleMenu && <Menu />}</main>
    </>
  );
};

export default Pokedex;
