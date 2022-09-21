import React from 'react';

import '../../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className='Footer'>
      <p className='Footer__content'>
        Built by:
        <a
          href='https://monoald.github.io/'
          target='_blank'
          rel='noreferrer'
          className='Footer__url'
        >
          Carlos S. Aldazosa
        </a>
      </p>
    </footer>
  );
};

export default Footer;
