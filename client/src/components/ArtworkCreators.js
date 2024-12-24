// @flow

import React from 'react';
import { Header, Item } from 'semantic-ui-react';
import _ from 'underscore';
import type { Participation } from '../types/Participation';
import Qualifiables from '../utils/Qualifiables';
import CertaintyLabel from './CertaintyLabel';
import RolesView from './RolesView';
import SimpleLink from './SimpleLink';
import './ArtworkCreators.css';

type Props = {
  items: Array<Participation>
};

const ArtworkCreators = (props: Props) => {
  if (!props.items) {
    return null;
  }

  return (
    <Item.Group
      className='artwork-creators'
      divided
      relaxed='very'
    >
      { _.map(props.items, (item) => (
        <Item>
          <Item.Content>
            <Item.Header>
              <Header
                className='tiny'
              >
                <SimpleLink
                  url={`/people/${item.person.id}`}
                >
                  { item.person.display_name }
                </SimpleLink>
              </Header>
            </Item.Header>
            <Item.Description>
              <RolesView
                items={[
                  Qualifiables.getValueListValue(item, 'Person', 'Participation Role'),
                  Qualifiables.getValueListValue(item, 'Person', 'Participation Subrole')
                ]}
              />
            </Item.Description>
            <Item.Description
              content={item.description}
            />
            { item.certainty && (
              <Item.Extra>
                <CertaintyLabel
                  value={item.certainty}
                />
              </Item.Extra>
            )}
            <Item.Extra
              content={item.notes}
            />
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default ArtworkCreators;
