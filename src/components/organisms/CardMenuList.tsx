import React from 'react';

import { CardMenuContent } from '../../types';

import CardMenu from '../atoms/CardMenu';

import '../../styles/MenuCardList.scss';

interface Props {
  list: CardMenuContent[];
}

const CardMenuList = ({ list }: Props) => {
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
