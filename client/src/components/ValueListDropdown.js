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
  const [valueLists, setValueLists] = useState([]);

  /**
   * Base attributes for new and matching qualifications.
   *
   * @type {{value_list_group: string, value_list_object: string}}
   */
  const attributes = useMemo(() => ({
    value_list_group: props.group,
    value_list_object: props.object
  }), [props.group, props.object]);

  /**
   * Returns the value for the component.
   */
  const value = useMemo(() => {
    const qualifications = _.filter(props.item.qualifications, (qualification) => (
      !qualification._destroy && _.isMatch(qualification, attributes)
    ));

    const ids = _.pluck(qualifications, 'value_list_id');
    return props.multiple ? ids : _.first(ids);
  }, [props.item.qualifications]);

  /**
   * Finds the existing qualification for the passed value list ID or creates a new one.
   *
   * @param valueListId
   *
   * @returns {*}
   */
  const findOrInitialize = useCallback((valueListId) => {
    const initializeAttributes = {
      ...attributes,
      value_list_id: valueListId
    };

    // Find an existing record based on the above attributes that is not marked for deletion.
    let record = _.find(props.item.qualifications, (qualification) => (
      !qualification._destroy && _.isMatch(qualification, initializeAttributes)
    ));

    // If no existing record can be found, create a new record.
    if (!record) {
      record = _.extend(initializeAttributes, {
        uid: uuid(),
        value_list: _.findWhere(valueLists, { id: valueListId })
      });
    }

    return record;
  }, [valueLists, props.item.qualifications]);

  /**
   * Sets the qualifications on the current item based on the dropdown value(s).
   *
   * @type {function(*, *): void}
   */
  const onChange = useCallback((e, data) => {
    let ids = [];

    if (data.value) {
      if (_.isArray(data.value)) {
        ids = data.value;
      } else {
        ids = [data.value];
      }
    }

    /*
     * Add any qualifications with matching group and object that are in the list of value list IDs.
     */
    const qualificationsToAdd = [];

    _.each(ids, (id) => {
      qualificationsToAdd.push(findOrInitialize(id));
    });

    _.each(qualificationsToAdd, (qualification) => {
      props.onSaveChildAssociation('qualifications', qualification);
    });

    /*
     * Delete any qualifications with matching group and object that are not in the list of value list IDs.
     */
    const qualificationsToDelete = _.filter(props.item.qualifications, (qualification) => (
      _.isMatch(qualification, attributes) && !_.contains(ids, qualification.value_list_id)
    ));

    _.each(qualificationsToDelete, (qualifications) => {
      props.onDeleteChildAssociation('qualifications', qualifications);
    });
  }, [valueLists, props.onDeleteChildAssociation, props.onSaveChildAssociation]);

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
      setValueLists(data.value_lists);
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
        options={_.map(valueLists, ValueList.toDropdown.bind(this))}
        placeholder={props.placeholder}
        search
        selectOnBlur={false}
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
