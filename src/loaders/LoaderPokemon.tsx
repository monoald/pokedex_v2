import React from 'react';

import LoaderHeader from './LoaderHeader';
import LoaderEvolutionCard from './LoaderEvolutionCard';

import '../styles/LoaderPokemon.scss';

const LoaderPokemon = () => {
  return (
    <>
      <LoaderHeader />
      <main className='Pokemon'>
        <div className='graphicLoader'></div>
        <div className='descriptionLoader'></div>
        <div className='infoLoader'></div>
        <div className='statsLoader'></div>
        <div className='capture-rateLoader'></div>
        <ul className='evolutionLoader'>
          {[1, 2, 3].map((num) => (
            <LoaderEvolutionCard key={num} />
          ))}
        </ul>
      </main>
    </>
  );
};

export default LoaderPokemon;
