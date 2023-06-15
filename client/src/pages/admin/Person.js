// @flow

import React from 'react';
import { EmbeddedList, ItemCollection } from '@performant-software/semantic-components';
import { Header, Image } from 'semantic-ui-react';
import _ from 'underscore';
import ParticipationModal, { ParticipationTypes } from '../../components/ParticipationModal';
import PeopleService from '../../services/People';
import PersonForm from '../../components/PersonForm';
import LocationModal, { LocationTypes } from '../../components/LocationModal';
import Qualifiables from '../../utils/Qualifiables';
import SimpleEditPage from '../../components/SimpleEditPage';
import SimpleLink from '../../components/SimpleLink';
import withMenuBar from '../../hooks/MenuBar';
import useEditPage from './EditPage';

import type { EditPageProps } from './EditPage';
import type { Person as PersonType } from '../../types/Person';
import type { Translateable } from '../../types/Translateable';

type Props = EditPageProps & Translateable & {
  item: PersonType
};

const Tabs = {
  details: 'details',
  artworks: 'artworks',
  locations: 'locations'
};

const Person = (props: Props) => (
  <SimpleEditPage
    errors={props.errors}
    loading={props.loading}
    onSave={props.onSave}
    onTabClick={props.onTabClick}
    saving={props.saving}
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
        renderHeader={(item) => item.participateable.primary_title && item.participateable.primary_title.title && (
          <SimpleLink
            url={`/admin/artworks/${item.participateable_id}`}
          >
            <Header
              as='h3'
              content={item.participateable.primary_title.title}
            />
          </SimpleLink>
        )}
        renderImage={(item) => (
          <Image
            src={item.participateable.primary_attachment && item.participateable.primary_attachment.thumbnail_url}
          />
        )}
        renderMeta={(item) => item.participateable.date_descriptor}
      />
    </SimpleEditPage.Tab>
    <SimpleEditPage.Tab
      key={Tabs.locations}
      name={props.t('Common.tabs.locations')}
    >
      <EmbeddedList
        actions={[{
          name: 'edit'
        }, {
          name: 'copy'
        }, {
          name: 'delete'
        }]}
        columns={[{
          name: 'name',
          label: props.t('Person.locations.columns.name'),
          render: (l) => l.place && l.place.name && (
            <SimpleLink
              content={l.place.name}
              url={`/admin/places/${l.place_id}`}
            />
          )
        }, {
          name: 'country',
          label: props.t('Person.locations.columns.country'),
          resolve: (l) => l.place && l.place.country
        }, {
          name: 'role',
          label: props.t('Person.locations.columns.role'),
          resolve: (l) => Qualifiables.getValueListValue(l, 'Location', 'Role')
        }]}
        items={props.item.locations}
        key='locations'
        modal={{
          component: LocationModal,
          props: {
            required: ['place_id'],
            type: LocationTypes.place
          }
        }}
        onDelete={props.onDeleteChildAssociation.bind(this, 'locations')}
        onSave={props.onSaveChildAssociation.bind(this, 'locations')}
      />
    </SimpleEditPage.Tab>
  </SimpleEditPage>
);

export default useEditPage(withMenuBar(Person), {
  onLoad: (id) => PeopleService.fetchOne(id).then(({ data }) => data.person),
  onSave: (person) => PeopleService.save(person).then(({ data }) => data.person),
  required: ['name', 'display_name']
});
