// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Item, Label } from 'semantic-ui-react';
import _ from 'underscore';
import type { Action } from '../types/Action';

type Props = {
  // $FlowIgnore - Not sure why this is throwing a Flow error
  items: Array<Action>
};

const DocumentActions = (props: Props) => {
  const { t } = useTranslation();

  /**
   * Renders the descriptors for the passed action.
   *
   * @type {function(*, *, *): *}
   */
  const renderDescriptors = useCallback((action, group, color) => {
    const descriptors = _.where(action.qualifications, {
      value_list_object: 'Action',
      value_list_group: group
    });

    return _.map(descriptors, (qualification) => (
      <Label
        color={color}
        content={qualification.value_list.human_name}
      />
    ));
  }, []);

  /**
   * Renders the text sentence for the passed action.
   *
   * @type {function(*): *}
   */
  const renderActionText = useCallback((action) => {
    const verb = _.findWhere(action.qualifications, { value_list_object: 'Document', value_list_group: 'Action' });
    const entity = _.findWhere(action.qualifications, { value_list_object: 'Action', value_list_group: 'Entity' });

    return t('Document.labels.action', { verb: verb.value_list.human_name, entity: entity.value_list.human_name });
  }, []);

  if (!props.items) {
    return null;
  }

  return (
    <Item.Group
      divided
    >
      { _.map(props.items, (item) => (
        <Item>
          <Item.Content>
            <Item.Header>
              { renderActionText(item) }
            </Item.Header>
            <Item.Description>
              { item.notes }
            </Item.Description>
            <Item.Extra>
              { renderDescriptors(item, 'Characteristic', 'blue') }
              { renderDescriptors(item, 'Body', 'green') }
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default DocumentActions;
