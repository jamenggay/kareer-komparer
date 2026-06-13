import React from 'react';
import logoImg from '../assets/kadakareer-logo.png';

export const Header: React.FC = () => {
  return (
    <header className="header-container">
      <img src={logoImg} className="brand-logo" alt="KadaKareer Logo" />
      <h1 className="header-title">
        Kareer <span>Komparer</span>
      </h1>
      <p className="header-subtitle">
        Empowering Filipino youth to make informed career decisions. Choose two paths below to compare them side-by-side, discover overlapping skills, and find out what you need to learn next.
      </p>
    </header>
  );
};
