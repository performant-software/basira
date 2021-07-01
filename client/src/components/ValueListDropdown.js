// @flow

import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import ValueLists from '../services/ValueLists';
import ValueList from '../transforms/ValueList';
import Qualifications from '../services/Qualifications';
import Qualification from '../transforms/Qualification';
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

  useEffect(() => {
    ValueLists.fetchAll({
      object_filter: props.object,
      group_filter: props.group,
      unpaginated: true
    })
      .then(resp => {
        const optionsList = resp.data.value_lists.map(option => ({ key: option.id, text: option.human_name, ...option }) );
        setOptions(optionsList);
      });
  }, []);

  return (
    <Form.Input
      error={props.isError(props.group)}
      label={props.label}
      required={props.isRequired(props.group)}
      width={props.width}
    >
      <RemoteDropdown
        allowAdditions={false}
        clearable={props.clearable}
        collectionName='value_lists'
        fluid
        multiple={props.multiple}
        onLoad={(params) => ValueLists.fetchAll(_.extend(params, {
          object_filter: props.object,
          group_filter: props.group,
          sort_by: 'human_name'
        }))}
        onSelection={(selection) => {
          const value_list_items = [];
          selection.forEach((sel) => {
            value_list_items.push(options.find(opt => opt.id === sel))
          });
          const allQualifications = [
            ...value_list_items.map((vl) => {
              ({
              qualifiable_type: props.object,
              qualifiable_id: props.item.id,
              value_list_id: vl.id,
              value_list: vl,
              group: props.group
            })}),
            ...props.item.qualifications
          ];
          props.onSelection(allQualifications);
        }}
        placeholder={props.placeholder}
        renderOption={ValueList.toDropdown.bind(this)}
        value={_.where(props.item.qualifications, { group: props.group }).map(qual => qual.value_list.id) || props.item.text || ''}
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
