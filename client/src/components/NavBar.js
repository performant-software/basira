// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';
import LinksMenu from './LinksMenu';
import './NavBar.css';

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Menu
      className='nav-bar'
      inverted
      size='large'
    >
      <Menu.Item
        as={Link}
        to='/'
      >
        <Header
          content={t('NavBar.title')}
          inverted
        />
      </Menu.Item>
      <Menu.Menu>
        <Menu.Item
          active={useRouteMatch('/people')}
          as={Link}
          content={t('NavBar.menu.creators')}
          to='people'
        />
        <Menu.Item
          active={useRouteMatch('/places')}
          as={Link}
          content={t('NavBar.menu.repositories')}
          to='places'
        />
      </Menu.Menu>
      <LinksMenu
        position='right'
      />
    </Menu>
  );
};

export default NavBar;
