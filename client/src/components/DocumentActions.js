// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Header, Label } from 'semantic-ui-react';
import _ from 'underscore';
import type { Action } from '../types/Action';
import './DocumentActions.css';

type Props = {
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

    return t('Document.labels.action', { verb: verb?.value_list?.human_name, entity: entity?.value_list?.human_name });
  }, []);

  if (!props.items) {
    return null;
  }

  return (
    <Card.Group
      className='document-actions'
      itemsPerRow={4}
    >
      { _.map(props.items, (item, index) => (
        <Card
          key={index}
        >
          <Card.Content>
            <Card.Header>
              <Header
                content={renderActionText(item)}
                size='tiny'
              />
            </Card.Header>
            { item.notes && (
              <Card.Description
                content={item.notes}
              />
            )}
          </Card.Content>
          <Card.Content
            extra
          >
            <Label.Group>
              { renderDescriptors(item, 'Characteristic', 'blue') }
              { renderDescriptors(item, 'Body', 'green') }
            </Label.Group>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default DocumentActions;
