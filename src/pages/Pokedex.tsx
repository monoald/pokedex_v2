import React, { useState, useEffect, useContext } from 'react';

import { HeaderContent } from '../types';

import AppContext from '../context/AppContext';

import useToggle from '../hooks/useToggle';

import Header from '../components/Header';
import Menu from '../components/Menu';
import PokemonCard from '../components/PokemonCard';
import PokemonCardList from '../containers/PokemonCardList';

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

  const {
    getPokedex,
    state: { pokedex, pokemon, currentPokedex },
  } = useContext(AppContext);

  useEffect(() => {
    getPokedex(currentPokedex);
  }, []);

  return (
    <>
      <Header content={content} />
      <main>
        {toggleMenu && <Menu menuToggle={menuEvent} />}
        <PokemonCardList>
          {pokedex[currentPokedex]?.poke?.map((poke, index) => (
            <PokemonCard
              key={poke}
              pokemon={pokemon[poke]}
              entryNumber={index}
            />
          ))}
        </PokemonCardList>
      </main>
    </>
  );
};

export default Pokedex;
