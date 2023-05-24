import React, { useState } from 'react';

import './navbar.styles.scss'

type NavItem = {
  title: string;
  link: string;
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navItems: NavItem[] = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Services', link: '/services' },
    { title: 'Contact', link: '/contact' },
  ];

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className="navbar-nav">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
