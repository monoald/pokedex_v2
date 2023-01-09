import React from 'react';
import PokemonCardList from '../containers/PokemonCardList';
import PokemonCardLoader from './LoaderPokemonCard';

const LoaderPokedex = () => {
  const elements = Array.from(Array(12).keys());
  return (
    <>
      <PokemonCardList>
        <>
          {elements.map((num) => (
            <PokemonCardLoader key={num} />
          ))}
        </>
      </PokemonCardList>
    </>
  );
};

export default LoaderPokedex;
