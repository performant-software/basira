// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Item } from 'semantic-ui-react';
import _ from 'underscore';
import type { Location } from '../types/Location';
import RolesView from './RolesView';
import Qualifiables from '../utils/Qualifiables';
import SimpleLink from './SimpleLink';
import './Locations.css';

type Props = {
  items: Array<Location>
};

const LOCATION_SEPARATOR = ', ';

const Locations = (props: Props) => {
  const { t } = useTranslation();

  /**
   * Concatenates the city, state, and country attributes for the passed place.
   *
   * @type {function(*): *}
   */
  const getLocationView = useCallback((place) => _.compact([
    place.city,
    place.state,
    place.country
  ]).join(LOCATION_SEPARATOR), []);

  if (!props.items) {
    return null;
  }

  return (
    <Item.Group
      className='locations'
      divided
      relaxed='very'
    >
      { _.map(props.items, (item) => (
        <Item>
          <Item.Content>
            <Item.Header>
              <Header
                size='tiny'
              >
                <SimpleLink
                  url={`/places/${item.place_id}`}
                >
                  { item.place?.name }
                </SimpleLink>
              </Header>
            </Item.Header>
            <Item.Meta
              content={item.place?.place_type}
            />
            <Item.Description
              content={getLocationView(item.place)}
            />
            { item.place?.url && (
              <Item.Description>
                <a
                  href={item.place.url}
                  rel='noreferrer'
                  target='_blank'
                >
                  { t('Locations.labels.viewInstitution') }
                </a>
              </Item.Description>
            )}
            <Item.Extra>
              <RolesView
                items={[
                  Qualifiables.getValueListValue(item, 'Location', 'Role'),
                  Qualifiables.getValueListValue(item, 'Location', 'Subrole')
                ]}
              />
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default Locations;
