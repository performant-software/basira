// @flow

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { withTranslation } from 'react-i18next';
import { Dropdown, Form, Radio } from 'semantic-ui-react';
import _ from 'underscore';
import Action from '../transforms/Action';
import Actions from '../services/Actions';
import ValueList from '../transforms/ValueList';
import withValueList, { type ValueListProps } from '../hooks/ValueListItems';
import './EntityDescriptionDropdown.css';

import type { Translateable } from '../types/Translateable';

const VALUE_LIST_GROUP = 'Entity';
const VALUE_LIST_OBJECT = 'Action';

const Views = {
  grouped: 0,
  all: 1
};

const EntityDescriptionDropdown = (props: Translateable & ValueListProps) => {
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState([]);
  const [view, setView] = useState(Views.grouped);

  /**
   * Sets the entity used to retrieve the bundled actions.
   */
  const entity = useMemo(() => _.findWhere(props.item.qualifications, {
    value_list_group: VALUE_LIST_GROUP,
    value_list_object: VALUE_LIST_OBJECT
  }), [props.item.qualifications]);

  /**
   * Compiles the list of dropdown options based on the valueLists prop and actions.
   *
   * @type {*[]}
   */
  const options = useMemo(() => ([
    ..._.map(props.valueLists, (v) => ValueList.toDropdown(v, { className: view === Views.grouped ? 'hidden' : '' })),
    ..._.map(actions, (a) => Action.toDropdown(a, { className: view === Views.all ? 'hidden' : '' }))
  ]), [actions, view, props.valueLists]);

  /**
   * Calls the onChange prop based on the current view. If we're removing an item, or selecting from the list of all
   * valueList options, we'll simply call the onChange prop. If we're adding an item from the grouped view, we'll
   * need to extract the value list IDs, then call the onChange prop with the IDs added to the passed value.
   *
   * @type {function(*=, {value?: *}): void}
   */
  const onChange = useCallback((e, { value }) => {
    if (view === Views.all || value.length < props.value.length) {
      props.onChange(e, { value });
    } else if (view === Views.grouped && value.length > props.value.length) {
      const selected = _.findWhere(actions, { id: _.last(value) });

      const ids = _.uniq([
        ..._.initial(value),
        ..._.pluck(selected.value_lists, 'id')
      ]);

      props.onChange(e, { value: ids });
    }
  }, [actions, view, props.onChange]);

  /**
   * Calls the actions service to fetch the grouped value list items for the selected entity.
   */
  useEffect(() => {
    if (entity) {
      setLoading(true);

      Actions
        .fetchAll({ entity_id: entity.value_list_id, per_page: 0 })
        .then(({ data }) => {
          setActions(_.sortBy(data.actions, Action.toLabel.bind(this)));
          setLoading(false);
        });
    }
  }, [entity]);

  return (
    <Form.Input
      className='entity-description-dropdown'
      error={props.isError(props.group)}
      label={props.label}
      required={props.isRequired(props.group)}
      width={props.width}
    >
      <Dropdown
        clearable={props.clearable}
        fluid
        header={(
          <Dropdown.Header>
            <Form.Field
              inline
            >
              <Radio
                label={props.t('EntityDescriptionDropdown.labels.grouped')}
                name='view'
                value={Views.grouped}
                checked={view === Views.grouped}
                onChange={(e, { value }) => setView(value)}
              />
              <Radio
                label={props.t('EntityDescriptionDropdown.labels.all')}
                name='view'
                value={Views.all}
                checked={view === Views.all}
                onChange={(e, { value }) => setView(value)}
              />
            </Form.Field>
          </Dropdown.Header>
        )}
        loading={props.loading || loading}
        multiple
        onChange={onChange}
        options={options}
        placeholder={props.placeholder}
        search
        selectOnBlur={false}
        selection
        value={props.value}
      />
    </Form.Input>
  );
};

export default withTranslation()(withValueList(EntityDescriptionDropdown));
