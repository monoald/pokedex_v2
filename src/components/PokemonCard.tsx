import React from 'react';

import { Link } from 'react-router-dom';

import { PokemonCardContent } from '../types';

import '../styles/PokemonCard.scss';

const PokemonCard = ({ pokemon, entryNumber }: PokemonCardContent) => {
  return (
    <li className='container'>
      <Link to={`/pokemon/${pokemon.name}`} className='Pokemon-Card card'>
        <div className='Pokemon-Card__left'>
          <p className='Pokemon-Card__number'>#{entryNumber}</p>
          <p className='Pokemon-Card__name'>{pokemon.name}</p>
          <ul className='types-container'>
            {pokemon.types.map((type) => (
              <li key={type} className={`type type--${type}`}>
                {type}
              </li>
            ))}
          </ul>
        </div>
        <div className='Pokemon-Card__right'>
          <figure className='Pokemon-Card__img-container'>
            <img
              src={pokemon.image}
              alt={`Photo of ${pokemon.name}`}
              className='Pokemon-Card__image'
            />
          </figure>
        </div>
      </Link>
    </li>
  );
};

export default PokemonCard;
