import React from 'react';
import HeaderLoader from './LoaderHeader';
import PokemonCardList from '../containers/PokemonCardList';
import PokemonCardLoader from './LoaderPokemonCard';

const LoaderPokedex = () => {
  const elements = Array.from(Array(12).keys());
  return (
    <>
      <HeaderLoader />
      <PokemonCardList>
        {elements.map((num) => (
          <PokemonCardLoader key={num} />
        ))}
      </PokemonCardList>
    </>
  );
};

export default LoaderPokedex;
