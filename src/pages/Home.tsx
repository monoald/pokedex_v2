import React from 'react';

import Header from '../components/molecules/Header';
import CardMenuList from '../components/organisms/CardMenuList';
import Footer from '../components/atoms/Footer';

import '../styles/Home.scss';
import { HeaderContent } from '../types';

const Home = () => {
  const headerContent: HeaderContent = {
    title: 'Pokedex',
  };

  return (
    <div className='Home'>
      <Header content={headerContent} />
      <main>
        <CardMenuList />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
