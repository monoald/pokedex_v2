import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/MenuCard.scss';
import { CardMenuContent } from '../../types';

interface Props {
  cardMenuContent: CardMenuContent;
}

const CardMenu = ({ cardMenuContent }: Props) => {
  return (
    <li className='container'>
      <Link to={cardMenuContent.url} className='CardMenu card'>
        <h2 className='CardMenu__title'>{cardMenuContent.title}</h2>
        <span className={`${cardMenuContent.image} CardMenu__image`}></span>
      </Link>
    </li>
  );
};

export default CardMenu;
