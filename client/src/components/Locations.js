// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Item, Label, List } from 'semantic-ui-react';
import _ from 'underscore';
import CertaintyLabel from './CertaintyLabel';
import type { Location } from '../types/Location';
import Qualifiables from '../utils/Qualifiables';
import RolesView from './RolesView';

type Props = {
  items: Array<Location>
};

const Locations = (props: Props) => {
  const { t } = useTranslation();

  if (!props.items) {
    return null;
  }

  return (
    <Item.Group
      divided
      relaxed='very'
    >
      { _.map(props.items, (item) => (
        <Item>
          <Item.Content>
            <Item.Header
              content={item.place.name}
            />
            <Item.Meta
              content={item.place.country}
            >
              <List
                divided
                horizontal
              >
                <List.Item>{ item.place.country }</List.Item>
                <List.Item>
                  <RolesView
                    value={[
                      Qualifiables.getValueListValue(item, 'Location', 'Role'),
                      Qualifiables.getValueListValue(item, 'Location', 'Subrole')
                    ]}
                  />
                </List.Item>
              </List>
            </Item.Meta>
            <Item.Description
              content={item.description}
            />
            <Item.Description
              content={item.notes}
            />
            <Item.Extra>
              <CertaintyLabel
                value={item.certainty}
              />
              <Label
                as='a'
                content={t('Common.buttons.viewSource')}
                icon='share square outline'
                href={item.repository_work_url}
                target='_blank'
              />
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default Locations;
