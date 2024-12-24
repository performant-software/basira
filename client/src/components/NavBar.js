// @flow

import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import LinksMenu from './LinksMenu';
import './NavBar.css';

const NavBar = () => {
  return (
    <Menu
      className='nav-bar'
      inverted
      size='large'
    >
      <Menu.Item>
        <Header
          content='BASIRA'
          inverted
        />
      </Menu.Item>
      <LinksMenu
        position='right'
      />
    </Menu>
  );
};

export default NavBar;
