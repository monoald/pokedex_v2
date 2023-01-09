import React, { useState, useEffect, useContext } from 'react';

import { HeaderContent } from '../types';

import AppContext from '../context/AppContext';

import useToggle from '../hooks/useToggle';
import useInfiniteScroll from '../hooks/usInfiniteScroll';

import LoaderPokedex from '../loaders/LoaderPokedex';
import Header from '../components/Header';
import Menu from '../components/Menu';
import PokemonCard from '../components/PokemonCard';
import PokemonCardList from '../containers/PokemonCardList';
import LoaderPokeball from '../loaders/LoaderPokeball';
import FilterContainer from '../containers/FilterContainer';

import '../styles/Filters.scss';
import filterElements from '../data/filterElements';
import { AllElements } from '../models/Filters';

const Pokedex = () => {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<string[]>([]);
  const [allElements, setAllElements] = useState<AllElements>(filterElements);
  const [filters, setFilters] = useState({
    region: null,
    types: [],
  });

  const {
    getPokedex,
    state: { pokedex, pokemon, currentPokedex },
    nextPage,
  } = useContext(AppContext);

  useEffect(() => {
    getPokedex(currentPokedex);
  }, [currentPokedex]);

  const [reference, isIntersected, setIsIntersected] = useInfiniteScroll(() => {
    nextPage({
      pokedexName: currentPokedex,
      setIntersecting: setIsIntersected,
    });
  });

  const filterEvent = () => {
    useToggle(setToggleFilter, toggleFilter);
    if (toggleMenu) {
      useToggle(setToggleMenu, toggleMenu);
    }
  };

  const menuEvent = () => {
    useToggle(setToggleMenu, toggleMenu);
    if (toggleFilter) {
      useToggle(setToggleFilter, toggleFilter);
    }
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
      {toggleMenu && <Menu menuToggle={menuEvent} />}
      {toggleFilter && (
        <FilterContainer
          isIntersected={isIntersected}
          isFiltered={isFiltered}
          setIsFiltered={setIsFiltered}
          allElements={allElements}
          setAllElements={setAllElements}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      {pokedex[currentPokedex] ? (
        <main>
          <PokemonCardList>
            <>
              {isFiltered.length > 0 &&
                pokedex[currentPokedex]?.poke?.map((poke, index) => {
                  for (const fil of isFiltered) {
                    if (pokemon[poke].types.includes(fil)) {
                      return (
                        <PokemonCard
                          key={poke}
                          pokemon={pokemon[poke]}
                          entryNumber={index}
                        />
                      );
                    }
                  }
                })}
              {isFiltered.length === 0 &&
                pokedex[currentPokedex]?.poke?.map((poke, index) => (
                  <PokemonCard
                    key={poke}
                    pokemon={pokemon[poke]}
                    entryNumber={index}
                  />
                ))}
            </>
          </PokemonCardList>
          {isIntersected && <LoaderPokeball />}
          <div id='sentinel' ref={reference} style={{ height: 100 }}></div>
        </main>
      ) : (
        <LoaderPokedex />
      )}
    </>
  );
};
export default Pokedex;
