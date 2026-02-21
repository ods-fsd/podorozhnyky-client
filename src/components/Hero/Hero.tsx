'use client'; 

import React from 'react';
import Link from 'next/link';


import globalCss from '@/app/Home.module.css';
import css from './Hero.module.css';

const Hero: React.FC = () => {
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    const targetElement = document.getElementById('join');
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      
      window.history.pushState(null, '', '#join');
    }
  };

  return (
    <section className={css.section} aria-labelledby="hero-title">
      
      <div className={css.backgroundImage} aria-hidden="true" />
      
      <div className={globalCss.container}>
        <div className={css.content}>
          <h1 id="hero-title" className={css.title}>
            Відкрийте світ подорожей з нами!
          </h1>
          
          <p className={css.description}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            своїми історіями та отримувати натхнення для нових пригод. Відкрийте
            для себе нові місця та знайдіть однодумців!
          </p>
          
          <Link 
            className={css.button} 
            href="#join"
            onClick={handleScroll}
          >
            Доєднатись
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;