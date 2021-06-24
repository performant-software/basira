// @flow

import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import ValueLists from '../services/ValueLists';
import ValueList from '../transforms/ValueList';
import { withTranslation } from 'react-i18next';
import { useEditContainer } from 'react-components';

import type { ValueListType } from '../types/ValueList';
import type { EditContainerProps } from 'react-components/types';

type Props = EditContainerProps & {
  item: ValueListType
};

const ValueListDropdown = (props: Props) => {

  const [options, setOptions] = useState([]);

  useEffect(() => {
    ValueLists.fetchAll({ table_filter: props.table, column_filter: props.column })
      .then(resp => {
        const optionsList = resp.data.value_lists.map(option => ({ key: option.value, value: option.value, text: option.value }) );
        setOptions(optionsList);
      });
  }, []);

  return (
    <Form.Dropdown
      clearable={props.clearable}
      label={props.label}
      multiple={props.multiple}
      onChange={props.onTextInputChange.bind(this, `${props.value}`)}
      options={options}
      placeholder={props.placeholder}
      search
      selection
      value={props.item[`${props.value}`] || ''}
      width={props.width}
    />
  );
};

ValueListDropdown.defaultProps = {
  clearable: true,
  multiple: false,
  width: 8
};

export default withTranslation()(useEditContainer(ValueListDropdown));
