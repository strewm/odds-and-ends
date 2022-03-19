import React, { useState } from 'react';

import splashOne from '../../Images/splash-1.png';
import splashTwo from '../../Images/splash-2.png';
import splashThree from '../../Images/splash-3.png';
import splashFour from '../../Images/splash-4.png';

import './SplashImage.css';

const SplashImage = () => {

  return (
      <div className='splash-image-container'>
        <div className='splash-image'>
            <img id='splash-image-1' src={splashOne} alt='splash image'/>
            <img id='splash-image-2' src={splashTwo} alt='splash image orange'/>
            <img id='splash-image-3' src={splashThree} alt='splash image pizza'/>
            <img id='splash-image-4' src={splashFour} alt='splash image wood'/>
        </div>
        <div className='splash-caption'>A low waste-motivated site, where users can share free items with their community!</div>
      </div>
  );
};

export default SplashImage;
