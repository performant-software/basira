// @flow

import React from 'react';
import { Label } from 'semantic-ui-react';

type Props = {
  content: string,
  level: number
};

const Colors = ['blue', 'orange'];

const ItemLabel = (props: Props) => (
  <Label
    color={Colors.length > props.level && Colors[props.level]}
    content={props.content}
  />
);

export default ItemLabel;
