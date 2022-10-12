import React from 'react';

import { CardMenuContent } from '../../types';

import CardMenu from '../atoms/CardMenu';

import '../../styles/MenuCardList.scss';

const CardMenuList = () => {
  const list: CardMenuContent[] = [
    {
      title: 'Pokemons',
      image: 'image-1',
      url: '/pokedex',
    },
    {
      title: 'Items',
      image: 'image-2',
      url: '/items',
    },
    {
      title: 'Moves',
      image: 'image-3',
      url: '/moves',
    },
    {
      title: 'Your Team',
      image: 'image-4',
      url: '/your-team',
    },
  ];

  return (
    <nav>
      <ul className='CardMenuList'>
        {list.map((card) => (
          <CardMenu content={card} key={card.url} />
        ))}
      </ul>
    </nav>
  );
};

export default CardMenuList;
