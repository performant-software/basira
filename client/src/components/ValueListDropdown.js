// @flow

import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import ValueLists from '../services/ValueLists';
import ValueList from '../transforms/ValueList';
import Selections from '../services/Selections';
import Selection from '../transforms/Selection';
import { withTranslation } from 'react-i18next';
import { AssociatedDropdown, useEditContainer, RemoteDropdown } from 'react-components';
import _ from 'underscore';
import uuid from 'react-uuid';

import type { ValueListType } from '../types/ValueList';
import type { EditContainerProps } from 'react-components/types';

type Props = EditContainerProps & {
  item: ValueListType
};

const ValueListDropdown = (props: Props) => {

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
debugger

  return (
    <Form.Input
      error={props.isError(props.column)}
      label={props.label}
      required={props.isRequired(props.column)}
      width={props.width}
    >
      <RemoteDropdown
        allowAdditions={false}
        collectionName='value_lists'
        fluid
        multiple={props.multiple}
        onLoad={() => ValueLists.fetchAll({
          table_filter: props.table,
          column_filter: props.column,
          sort_by: 'value'
        })}
        onSelection={(value) => props.onTextInputChange(props.column, null, { value })}
        renderOption={ValueList.toDropdown.bind(this)}
        value={props.item[props.column] || ''}
      />
    </Form.Input>
  );
};

ValueListDropdown.defaultProps = {
  clearable: true,
  multiple: false,
  width: 6
};

export default withTranslation()(useEditContainer(ValueListDropdown));
