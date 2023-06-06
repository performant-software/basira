// @flow

import React from 'react';
import { Label } from 'semantic-ui-react';
import _ from 'underscore';
import Certainty from '../resources/Certainty.json';

type Props = {
  value: number
};

const CertaintyLabel = (props: Props) => {
  const certainty = _.findWhere(Certainty, { value: props.value });

  if (!certainty) {
    return null;
  }

  return (
    <Label
      color={certainty.color}
      content={certainty.text}
    />
  );
};

export default CertaintyLabel;
