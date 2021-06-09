// @flow

import React from 'react';
import _ from 'underscore';
import ParticipationModal, { ParticipationTypes } from '../../components/ParticipationModal';
import PeopleService from '../../services/People';
import PersonForm from '../../components/PersonForm';
import { Image } from 'semantic-ui-react';
import { ItemCollection } from 'react-components';
import SimpleEditPage from '../../components/SimpleEditPage';
import withMenuBar from '../../hooks/MenuBar';
import useEditPage from './EditPage';

import type { EditContainerProps } from 'react-components/types';
import type { Person as PersonType } from '../../types/Person';
import type { Translateable } from '../../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: PersonType
};

const Tabs = {
  details: 'details',
  artworks: 'artworks'
};

const Person = (props: Props) => (
  <SimpleEditPage
    errors={props.errors}
    loading={props.loading}
    onSave={props.onSave}
  >
    <SimpleEditPage.Tab
      key={Tabs.details}
      name={props.t('Common.tabs.details')}
    >
      <PersonForm
        {...props}
      />
    </SimpleEditPage.Tab>
    <SimpleEditPage.Tab
      key={Tabs.artworks}
      name={props.t('Person.tabs.artworks')}
    >
      <ItemCollection
        actions={[{
          name: 'edit'
        }, {
          name: 'delete'
        }]}
        items={_.filter(props.item.participations, (p) => !p._destroy)}
        modal={{
          component: ParticipationModal,
          props: {
            defaults: {
              participateable_type: 'Artwork'
            },
            required: ['participateable_id'],
            type: ParticipationTypes.artwork
          }
        }}
        onDelete={props.onDeleteChildAssociation.bind(this, 'participations')}
        onSave={props.onSaveChildAssociation.bind(this, 'participations')}
        renderDescription={(item) => item.role}
        renderHeader={(item) => item.participateable.primary_title && item.participateable.primary_title.title}
        renderImage={(item) => (
          <Image
            src={item.participateable.primary_attachment && item.participateable.primary_attachment.thumbnail_url}
          />
        )}
        renderMeta={(item) => item.participateable.date_descriptor}
      />
    </SimpleEditPage.Tab>
  </SimpleEditPage>
);

export default useEditPage(withMenuBar(Person), {
  onLoad: (id) => PeopleService.fetchOne(id).then(({ data }) => data.person),
  onSave: (person) => PeopleService.save(person),
  required: ['name', 'display_name']
});
