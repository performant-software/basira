// @flow

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { withTranslation } from 'react-i18next';
import uuid from 'react-uuid';
import { Dropdown, Form } from 'semantic-ui-react';
import _ from 'underscore';
import ValueLists from '../services/ValueLists';
import ValueList from '../transforms/ValueList';

import type { EditContainerProps } from 'react-components/types';
import type { Qualification } from '../types/Qualification';

type Qualifiable = {
  qualifications: Array<Qualification>
};

type Props = EditContainerProps & {
  clearable?: boolean,
  item: Qualifiable,
  group: string,
  label?: string,
  multiple?: boolean,
  object: string,
  placeholder?: string,
  width?: number
};

const ValueListDropdown = (props: Props) => {
  const [options, setOptions] = useState([]);

  /**
   * Finds the existing qualification for the passed value list ID or creates a new one.
   *
   * @param valueListId
   *
   * @returns {*}
   */
  const findOrInitialize = useCallback((valueListId) => {
    const attributes = {
      value_list_group: props.group,
      value_list_object: props.object,
      value_list_id: valueListId
    };

    // Find an existing record based on the above attributes that is not marked for deletion.
    let record = _.find(props.item.qualifications, (qualification) => (
      !qualification._destroy && _.isMatch(qualification, attributes)
    ));

    // If no existing record can be found, create a new record.
    if (!record) {
      record = _.extend(attributes, { uid: uuid() });
    }

    return record;
  }, [props.item.qualifications]);

  /**
   * Sets the qualifications on the current item based on the dropdown value(s).
   *
   * @type {function(*, *): void}
   */
  const onChange = useCallback((e, data) => {
    const qualifications = [];

    if (data.value) {
      const ids = _.isArray(data.value) ? data.value : [data.value];

      _.each(ids, (id) => {
        qualifications.push(findOrInitialize(id));
      });
    }

    props.onMultiAddChildAssociations('qualifications', qualifications);
  }, [props.onMultiAddChildAssociations]);

  /**
   * Returns the value for the component.
   */
  const value = useMemo(() => {
    const attributes = {
      value_list_group: props.group,
      value_list_object: props.object
    };

    const qualifications = _.filter(props.item.qualifications, (qualification) => (
      !qualification._destroy && _.isMatch(qualification, attributes)
    ));

    const ids = _.pluck(qualifications, 'value_list_id');

    return props.multiple ? ids : _.first(ids);
  }, [props.item.qualifications]);

  /**
   * Sets the dropdown options for the component.
   */
  useEffect(() => {
    ValueLists.fetchAll({
      object_filter: props.object,
      group_filter: props.group,
      sort_by: 'human_name',
      per_page: 0
    }).then(({ data }) => {
      setOptions(_.map(data.value_lists, ValueList.toDropdown.bind(this)));
    });
  }, [props.group, props.object]);

  return (
    <Form.Input
      error={props.isError(props.group)}
      label={props.label}
      required={props.isRequired(props.group)}
      width={props.width}
    >
      <Dropdown
        clearable={props.clearable}
        fluid
        multiple={props.multiple}
        onChange={onChange}
        options={options}
        placeholder={props.placeholder}
        search
        selection
        value={value}
      />
    </Form.Input>
  );
};

ValueListDropdown.defaultProps = {
  clearable: true,
  multiple: false
};

export default withTranslation()(ValueListDropdown);
