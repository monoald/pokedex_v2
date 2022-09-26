import React from 'react';
import { IconButton } from '../../types';
import '../../styles/Button.scss';

interface Props {
  icon: IconButton;
}

const Button = ({ icon }: Props) => {
  return (
    <button
      id={icon.id}
      type='submit'
      className='Button-icon'
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onClick={icon.event}
    >
      <span className={`${icon.class} icon`}></span>
    </button>
  );
};

export default Button;
