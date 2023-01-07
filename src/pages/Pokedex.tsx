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

const Pokedex = () => {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<string[]>([]);

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

  const {
    getPokedex,
    state: { pokedex, pokemon, currentPokedex },
    nextPage,
  } = useContext(AppContext);

  useEffect(() => {
    getPokedex(currentPokedex);
  }, [currentPokedex]);

  const [allElements, setAllElements] = useState({
    regions: [
      {
        name: 'National',
        id: 'national',
        index: 0,
      },
      {
        name: 'Kanto',
        id: 'kanto',
        index: 1,
      },
      {
        name: 'Johto',
        id: 'original-johto',
        index: 2,
      },
      {
        name: 'Hoenn',
        id: 'hoenn',
        index: 3,
      },
      {
        name: 'Sinnoh',
        id: 'original-sinnoh',
        index: 4,
      },
      {
        name: 'Sinnoh Extended',
        id: 'extended-sinnoh',
        index: 5,
      },
      {
        name: 'Johto Updated',
        id: 'updated-johto',
        index: 6,
      },
      {
        name: 'Unova',
        id: 'original-unova',
        index: 7,
      },
      {
        name: 'Unova Updated',
        id: 'updated-unova',
        index: 8,
      },
      {
        name: 'Conquest Gallery',
        id: 'conquest-gallery',
        index: 9,
      },
      {
        name: 'Central Kalos',
        id: 'kalos-central',
        index: 10,
      },
      {
        name: 'Coastal Kalos',
        id: 'kalos-coastal',
        index: 11,
      },
      {
        name: 'Mountain Kalos',
        id: 'kalos-mountain',
        index: 12,
      },
      {
        name: 'Hoenn Updated',
        id: 'updated-hoenn',
        index: 13,
      },
      {
        name: 'Alola',
        id: 'original-alola',
        index: 14,
      },
      {
        name: 'Melemele',
        id: 'original-melemele',
        index: 15,
      },
      {
        name: 'Akala',
        id: 'original-akala',
        index: 16,
      },
      {
        name: 'Ulaula',
        id: 'original-ulaula',
        index: 17,
      },
      {
        name: 'Poni',
        id: 'original-poni',
        index: 18,
      },
      {
        name: 'Alola Updated',
        id: 'updated-alola',
        index: 19,
      },
    ],
    types: [
      {
        name: 'normal',
        index: 0,
      },
      {
        name: 'fighting',
        index: 1,
      },
      {
        name: 'flying',
        index: 2,
      },
      {
        name: 'poison',
        index: 3,
      },
      {
        name: 'ground',
        index: 4,
      },
      {
        name: 'rock',
        index: 5,
      },
      {
        name: 'bug',
        index: 6,
      },
      {
        name: 'ghost',
        index: 7,
      },
      {
        name: 'steel',
        index: 8,
      },
      {
        name: 'fire',
        index: 9,
      },
      {
        name: 'water',
        index: 10,
      },
      {
        name: 'grass',
        index: 11,
      },
      {
        name: 'electric',
        index: 12,
      },
      {
        name: 'psychic',
        index: 13,
      },
      {
        name: 'ice',
        index: 14,
      },
      {
        name: 'dragon',
        index: 15,
      },
      {
        name: 'dark',
        index: 16,
      },
      {
        name: 'fairy',
        index: 17,
      },
    ],
  });
  const [filters, setFilters] = useState({
    region: null,
    types: [],
  });

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
