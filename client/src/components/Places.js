// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Item, Label } from 'semantic-ui-react';
import _ from 'underscore';
import type { Place } from '../types/Place';
import SimpleLink from './SimpleLink';

type Props = {
  places: Array<Place>
};

const Places = (props: Props) => {
  const { t } = useTranslation();

  if (!props.places) {
    return null;
  }

  return (
    <Item.Group
      divided
      relaxed='very'
    >
      { _.map(props.places, (place) => (
        <Item>
          <Item.Content>
            <Item.Header>
              <SimpleLink
                url={`/places/${place.id}`}
              >
                { place.name }
              </SimpleLink>
            </Item.Header>
            <Item.Meta
              content={place.country}
            />
            <Item.Description
              content={place.notes}
            />
            { place.url && (
              <Item.Extra>
                <Label
                  as='a'
                  content={t('Common.buttons.viewSource')}
                  icon='share square outline'
                  href={place.url}
                  target='_blank'
                />
              </Item.Extra>
            )}
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default Places;
