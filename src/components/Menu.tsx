import React from 'react';

import CardMenuList from '../containers/CardMenuList';

import '../styles/Menu.scss';

interface Props {
  menuToggle: () => void;
}

const Menu = ({ menuToggle }: Props) => {
  return (
    <section className='Menu'>
      <button
        className='Menu__close-button'
        type='button'
        onClick={menuToggle}
      ></button>
      <CardMenuList />
    </section>
  );
};

export default Menu;
