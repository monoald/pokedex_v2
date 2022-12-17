import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../context/AppContext';
import { Evolutions } from '../models/Pokemon';

import '../styles/EvolutionCard.scss';

interface Props {
  evolution: Evolutions;
}

const EvolutionCard = ({ evolution }: Props) => {
  const {
    state: { pokemon },
  } = useContext(AppContext);

  return (
    <li className='card-container'>
      <Link
        to={`/pokemon/${pokemon[evolution.name]?.name}`}
        className='EvolutionCard'
      >
        <div className='head'>
          <p className='name'>{pokemon[evolution.name]?.name}</p>

          <ul className='types-container'>
            {pokemon[evolution.name]?.types.map((type) => (
              <li key={type} className={`type type--${type}`}>
                {type}
              </li>
            ))}
          </ul>
        </div>

        <div className='foot'>
          <figure className='img-container'>
            <img
              src={pokemon[evolution.name]?.image}
              alt={`Photo of ${pokemon[evolution.name]?.name}`}
              className='image'
            />
          </figure>
        </div>
      </Link>
    </li>
  );
};

export default EvolutionCard;
