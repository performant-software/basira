// @flow

import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import LinksMenu from './LinksMenu';
import FooterLinks from './FooterLinks';
import PerformantLogo from '../images/performant-logo.png';
import './PageFooter.css';

const PageFooter = () => (
  <Container
    className='page-footer'
    fluid
  >
    <Menu
      borderless
      text
    >
      <LinksMenu />
    </Menu>
    <Menu
      borderless
      className='performant-menu'
      text
    >
      <Menu.Item
        as='a'
        href='https://www.performantsoftware.com/'
        target='_blank'
      >
        <Image
          src={PerformantLogo}
          size='small'
        />
      </Menu.Item>
    </Menu>
    <FooterLinks />
  </Container>
);

export default PageFooter;
