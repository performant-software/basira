// @flow

import React, { type Node } from 'react';
import { Link } from 'react-router-dom';
import './SimpleLink.css';

type Props = {
  children?: Node,
  content?: string,
  url: string
};

const SimpleLink = (props: Props) => (
  <Link
    className='simple-link'
    to={props.url}
  >
    { props.content || props.children }
  </Link>
);

SimpleLink.defaultProps = {
  children: undefined,
  content: undefined
};

export default SimpleLink;
