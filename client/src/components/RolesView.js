// @flow

import React from 'react';
import _ from 'underscore';

type Props = {
  value: Array<string>
};

const ROLES_SEPARATOR = ', ';

const RolesView = (props: Props) => {
  const value = _.compact(props.value);

  if (_.isEmpty(value)) {
    return null;
  }

  return (
    <span>{ value.join(ROLES_SEPARATOR) }</span>
  );
};

export default RolesView;
