// @flow

import React, { type Node } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import './Section.css';

type Props = {
  children: Node,
  title: string
}

const Section = (props: Props) => (
  <div
    className='section'
  >
    <Header
      content={props.title}
    />
    <Divider />
    { props.children }
  </div>
);

export default Section;
