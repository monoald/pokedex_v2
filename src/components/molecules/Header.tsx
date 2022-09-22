import React from 'react';
import { HeaderContent } from '../../types';
import Button from '../atoms/Button';
import '../../styles/Header.scss';

interface Props {
  content: HeaderContent;
}

const Header = ({ content }: Props) => {
  return (
    <header className='Header'>
      <p className='Header__title'>{content.title}</p>

      <div className='icons-container'>
        {content.icons?.map((icon) => (
          <Button key={icon.id} icon={icon} />
        ))}
      </div>
    </header>
  );
};

export default Header;
