import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/MenuCard.scss';
import { CardMenuContent } from '../../types';

interface Props {
  content: CardMenuContent;
}

const CardMenu = ({ content }: Props) => {
  return (
    <li className='container'>
      <Link to={content.url} className='CardMenu card'>
        <h2 className='CardMenu__title'>{content.title}</h2>
        <span className={`${content.image} CardMenu__image`}></span>
      </Link>
    </li>
  );
};

export default CardMenu;
