import React from 'react';

import { Link } from 'react-router-dom';

import { CardMenuContent } from '../types';

import '../styles/MenuCard.scss';

interface Props {
  content: CardMenuContent;
}

const CardMenu = ({ content }: Props) => {
  return (
    <li className='container'>
      <Link to={content.url} className='CardMenu card'>
        <span className='CardMenu__title'>{content.title}</span>
        <span className={`${content.image} CardMenu__image`}></span>
      </Link>
    </li>
  );
};

export default CardMenu;
