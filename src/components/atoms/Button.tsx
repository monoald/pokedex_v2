import React from 'react';
import { Icons } from '../../types';
import '../../styles/Button.scss';

interface Props {
  icon: Icons;
}

const Button = ({ icon }: Props) => {
  return (
    <button id={icon.id} type='submit' className='Button-icon'>
      <span className={`${icon.class} icon`}></span>
    </button>
  );
};

export default Button;
