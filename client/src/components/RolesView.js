// @flow

import React from 'react';
import { Label } from 'semantic-ui-react';
import _ from 'underscore';

type Props = {
  items: Array<string>
};

const RolesView = (props: Props) => {
  const items = _.compact(props.items);

  if (_.isEmpty(items)) {
    return null;
  }

  return (
    <Label.Group>
      { _.map(items, (item) => (
        <Label
          content={item}
        />
      ))}
    </Label.Group>
  );
};

export default RolesView;
