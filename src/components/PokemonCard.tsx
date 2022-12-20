import React from 'react';
import { Link } from 'react-router-dom';

import { PokemonCardContent } from '../types';

import '../styles/PokemonCard.scss';
import removeLoadingImage from '../utils/removeLoadingImage';

const PokemonCard = ({ pokemon, entryNumber }: PokemonCardContent) => {
  return (
    <li className='container'>
      <Link to={`/pokemon/${pokemon.name}`} className='PokemonCard card'>
        <div className='left'>
          <p className='number'>#{entryNumber + 1}</p>
          <p className='name'>{pokemon.name}</p>
          <ul className='types-container'>
            {pokemon.types.map((type) => (
              <li key={type} className={`type type--${type}`}>
                {type}
              </li>
            ))}
          </ul>
        </div>
        <div className='right'>
          <figure className='img-container'>
            <img
              src={pokemon.image}
              alt={`Photo of ${pokemon.name}`}
              className='loading'
              onLoad={removeLoadingImage}
            />
          </figure>
        </div>
      </Link>
    </li>
  );
};

export default PokemonCard;
