import React from 'react';

import { HeaderContent } from '../types';
import { CardMenuContent } from '../types';

import CardMenu from '../components/atoms/CardMenu';
import Header from '../components/molecules/Header';
import Footer from '../components/atoms/Footer';

const Home = () => {
  const cardMenu: CardMenuContent = {
    title: 'Pokemons',
    image: 'image-1',
    url: 'im an url',
  };

  const header: HeaderContent = {
    title: 'Pokemon',
    icons: [
      {
        class: 'filter_icon',
        id: 'filter',
      },
      {
        class: 'menu_icon',
        id: 'menu',
      },
    ],
  };

  return (
    <>
      <Header content={header} />
      <CardMenu content={cardMenu} />
      <Footer />
    </>
  );
};

export default Home;
