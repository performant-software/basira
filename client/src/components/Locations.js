// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Item } from 'semantic-ui-react';
import _ from 'underscore';
import CertaintyLabel from './CertaintyLabel';
import type { Location } from '../types/Location';
import RolesView from './RolesView';
import Qualifiables from '../utils/Qualifiables';
import SimpleLink from './SimpleLink';

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
            <Item.Header>
              <SimpleLink
                url={`/places/${item.place_id}`}
              >
                { item.place?.name }
              </SimpleLink>
            </Item.Header>
            <Item.Meta
              content={item.place?.country}
            />
            <Item.Description>
              <RolesView
                value={[
                  Qualifiables.getValueListValue(item, 'Location', 'Role'),
                  Qualifiables.getValueListValue(item, 'Location', 'Subrole')
                ]}
              />
            </Item.Description>
            <Item.Description
              content={item.description}
            />
            <Item.Description
              content={item.notes}
            />
            { item.certainty && (
              <Item.Extra>
                <CertaintyLabel
                  value={item.certainty}
                />
              </Item.Extra>
            )}
            { item.repository_work_url && (
              <Item.Extra>
                <a
                  href={item.repository_work_url}
                  rel='noreferrer'
                  target='_blank'
                >
                  { t('Common.buttons.viewSource') }
                </a>
              </Item.Extra>
            )}
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default Locations;
