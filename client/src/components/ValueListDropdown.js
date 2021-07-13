// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Dropdown, Form } from 'semantic-ui-react';
import _ from 'underscore';
import ValueList from '../transforms/ValueList';
import withValueList, { type ValueListProps } from '../hooks/ValueListItems';

const ValueListDropdown = (props: ValueListProps) => (
  <Form.Input
    error={props.isError(props.group)}
    label={props.label}
    required={props.isRequired(props.group)}
    width={props.width}
  >
    <Dropdown
      clearable={props.clearable}
      fluid
      loading={props.loading}
      multiple={props.multiple}
      onChange={props.onChange}
      options={_.map(props.valueLists, ValueList.toDropdown.bind(this))}
      placeholder={props.placeholder}
      search
      selectOnBlur={false}
      selection
      value={props.value}
    />
  </Form.Input>
);

ValueListDropdown.defaultProps = {
  clearable: true,
  formField: '',
  multiple: false
};

export default withTranslation()(withValueList(ValueListDropdown));
