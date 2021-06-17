// @flow

import React from 'react';
import { Form } from 'semantic-ui-react';
import { RemoteDropdown, type EditModalProps } from 'react-components';
import _ from 'underscore';
import ValueLists from '../services/ValueLists';
import ValueList from '../transforms/ValueList';

type Props = EditModalProps & {
  allowAdditions?: boolean,
  column: string,
  label: string,
  multiple?: boolean,
  table: string
};

const ValueListDropdown = (props: Props) => (
  <Form.Input
    error={props.isError(props.column)}
    label={props.label}
    required={props.isRequired(props.column)}
  >
    <RemoteDropdown
      allowAdditions={props.allowAdditions}
      collectionName='value_lists'
      fluid
      multiple={props.multiple}
      onAddItem={(value) => ValueLists.save({ table: props.table, column: props.column, value })}
      onLoad={(params) => ValueLists.fetchAll(_.extend(params, {
        table: props.table,
        column: props.column,
        sort_by: 'value'
      }))}
      onSelection={(value) => props.onTextInputChange(props.column, null, { value })}
      renderOption={ValueList.toDropdown.bind(this)}
      value={props.item[props.column] || ''}
    />
  </Form.Input>
);

ValueListDropdown.defaultProps = {
  allowAdditions: true,
  multiple: false
};

export default ValueListDropdown;
