// @flow

import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import LinksMenu from './LinksMenu';
import FooterLinks from './FooterLinks';
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
    <FooterLinks />
  </Container>
);

export default PageFooter;
