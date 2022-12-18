import React from 'react';

import '../styles/PokemonCardList.scss';

interface Props {
  children: JSX.Element[];
}

const PokemonCardList = ({ children }: Props) => {
  return <ul className='Pokemon-Card-List'>{children}</ul>;
};

export default PokemonCardList;
