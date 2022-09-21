import React from 'react';
import CardMenu from '../components/atoms/CardMenu';
import { CardMenuContent } from '../types';

const Home = () => {
  const props: CardMenuContent = {
    title: 'Pokemons',
    image: 'image-1',
    url: 'im an url',
  };

  return (
    <>
      <h1>Hola</h1>
      <CardMenu cardMenuContent={props} />
    </>
  );
};

export default Home;
