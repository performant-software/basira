// @flow

import React from 'react';
import { EmbeddedList, ItemCollection } from 'react-components';
import { withTranslation } from 'react-i18next';
import { Header, Image } from 'semantic-ui-react';
import _ from 'underscore';
import LocationModal, { LocationTypes } from '../../components/LocationModal';
import PlaceForm from '../../components/PlaceForm';
import PlacesService from '../../services/Places';
import Qualifiables from '../../utils/Qualifiables';
import SimpleEditPage from '../../components/SimpleEditPage';
import SimpleLink from '../../components/SimpleLink';
import useEditPage from './EditPage';
import withMenuBar from '../../hooks/MenuBar';

import type { EditPageProps } from './EditPage';
import type { Place as PlaceType } from '../../types/Place';
import type { Translateable } from '../../types/Translateable';

type Props = EditPageProps & Translateable & {
  item: PlaceType
};

const Tabs = {
  details: 'details',
  artworks: 'artworks',
  people: 'people'
};

const Place = (props: Props) => (
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
      <PlaceForm
        {...props}
      />
    </SimpleEditPage.Tab>
    <SimpleEditPage.Tab
      key={Tabs.artworks}
      name={props.t('Place.tabs.artworks')}
    >
      <ItemCollection
        actions={[{
          name: 'edit'
        }, {
          name: 'delete'
        }]}
        items={_.filter(props.item.locations, (l) => l.locateable_type === 'Artwork' && !l._destroy)}
        modal={{
          component: LocationModal,
          props: {
            defaults: {
              locateable_type: 'Artwork'
            },
            required: ['locateable_id'],
            type: LocationTypes.artwork
          }
        }}
        onDelete={props.onDeleteChildAssociation.bind(this, 'locations')}
        onSave={props.onSaveChildAssociation.bind(this, 'locations')}
        renderDescription={(item) => item.role}
        renderHeader={(item) => item.locateable.primary_title && item.locateable.primary_title.title && (
          <SimpleLink
            url={`/admin/artworks/${item.locateable_id}`}
          >
            <Header
              as='h3'
              content={item.locateable.primary_title.title}
            />
          </SimpleLink>
        )}
        renderImage={(item) => (
          <Image
            src={item.locateable.primary_attachment && item.locateable.primary_attachment.thumbnail_url}
          />
        )}
        renderMeta={(item) => item.locateable.date_descriptor}
      />
    </SimpleEditPage.Tab>
    <SimpleEditPage.Tab
      key={Tabs.people}
      name={props.t('Place.tabs.people')}
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
          label: props.t('Place.locations.columns.name'),
          render: (l) => l.locateable && l.locateable.display_name && (
            <SimpleLink
              content={l.locateable.display_name}
              url={`/admin/people/${l.locateable_id}`}
            />
          )
        }, {
          name: 'role',
          label: props.t('Place.locations.columns.role'),
          resolve: (l) => Qualifiables.getValueListValue(l, 'Location', 'Role')
        }]}
        items={_.filter(props.item.locations, (l) => l.locateable_type === 'Person')}
        key='locations'
        modal={{
          component: LocationModal,
          props: {
            defaults: {
              locateable_type: 'Person'
            },
            required: ['locateable_id'],
            type: LocationTypes.person
          }
        }}
        onDelete={props.onDeleteChildAssociation.bind(this, 'locations')}
        onSave={props.onSaveChildAssociation.bind(this, 'locations')}
      />
    </SimpleEditPage.Tab>
  </SimpleEditPage>
);

export default withTranslation()(useEditPage(withMenuBar(Place), {
  onLoad: (id) => PlacesService.fetchOne(id).then(({ data }) => data.place),
  onSave: (place) => PlacesService.save(place).then(({ data }) => data.place),
  required: ['name']
}));
