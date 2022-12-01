import React from 'react';

import Header from '../components/Header';
import CardMenuList from '../containers/CardMenuList';
import Footer from '../components/Footer';

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
