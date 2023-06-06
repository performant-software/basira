// @flow

import React from 'react';
import { Item } from 'semantic-ui-react';
import _ from 'underscore';
import type { Participation } from '../types/Participation';
import Qualifiables from '../utils/Qualifiables';
import CertaintyLabel from './CertaintyLabel';
import RolesView from './RolesView';
import SimpleLink from './SimpleLink';

type Props = {
  items: Array<Participation>
};

const ArtworkCreators = (props: Props) => {
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
                url={`/people/${item.person.id}`}
              >
                { item.person.display_name }
              </SimpleLink>
            </Item.Header>
            <Item.Meta>
              <RolesView
                value={[
                  Qualifiables.getValueListValue(item, 'Person', 'Participation Role'),
                  Qualifiables.getValueListValue(item, 'Person', 'Participation Subrole')
                ]}
              />
            </Item.Meta>
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
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default ArtworkCreators;
