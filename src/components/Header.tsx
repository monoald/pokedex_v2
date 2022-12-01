import React from 'react';
import { HeaderContent } from '../types';
import Button from './Button';
import '../styles/Header.scss';

interface Props {
  content: HeaderContent;
}

const Header = ({ content }: Props) => {
  return (
    <header className='Header'>
      <h1 className='Header__title'>{content.title}</h1>

      <div className='icons-container'>
        {content.icons?.map((icon) => (
          <Button key={icon.id} icon={icon} />
        ))}
      </div>
    </header>
  );
};

export default Header;
