// @flow

import React from 'react';
import { Image, Menu, MenuProps } from 'semantic-ui-react';
import PennLogo from '../images/penn-logo.png';
import KressLogo from '../images/kress-logo.png';
import PriceLogo from '../images/price-logo.png';

type Props = typeof MenuProps;

const FooterLinks = (props: Props) => (
  <Menu
    fixed={props.fixed}
    widths={4}
  >
    <Menu.Item
      as='a'
      href='https://www.library.upenn.edu/'
      target='_blank'
    >
      <Image
        src={PennLogo}
        size='small'
      />
    </Menu.Item>
    <Menu.Item
      as='a'
      href='https://www.kressfoundation.org/'
      target='_blank'
    >
      <Image
        src={KressLogo}
        size='small'
      />
    </Menu.Item>
    <Menu.Item
      as='a'
      href='https://pricelab.sas.upenn.edu/'
      target='_blank'
    >
      <Image
        src={PriceLogo}
        size='small'
      />
    </Menu.Item>
  </Menu>
);

export default FooterLinks;
