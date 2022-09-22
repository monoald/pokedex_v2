import React from 'react';

import { HomeContent } from '../types';

import Header from '../components/molecules/Header';
import CardMenuList from '../components/organisms/CardMenuList';
import Footer from '../components/atoms/Footer';

import '../styles/Home.scss';

const Home = () => {
  const content: HomeContent = {
    header: { title: 'Pokedex' },
    cardMenu: [
      {
        title: 'Pokemons',
        image: 'image-1',
        url: 'pokedex',
      },
      {
        title: 'Items',
        image: 'image-2',
        url: 'items',
      },
      {
        title: 'Moves',
        image: 'image-3',
        url: 'moves',
      },
      {
        title: 'Your Team',
        image: 'image-4',
        url: 'your-team',
      },
    ],
  };

  return (
    <div className='Home'>
      <Header content={content.header} />
      <main>
        <CardMenuList list={content.cardMenu} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
