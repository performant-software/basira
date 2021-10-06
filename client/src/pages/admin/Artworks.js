// @flow

import React from 'react';
import { FilterTypes, ListFilters } from 'react-components';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import _ from 'underscore';
import ArtworksList from '../../components/ArtworksList';
import ArtworksService from '../../services/Artworks';
import Users from '../../services/Users';
import User from '../../transforms/User';
import withMenuBar from '../../hooks/MenuBar';
import './Artworks.css';

import type { ListProps } from 'react-components/types';
import type { Routeable } from '../../types/Routeable';
import type { User as UserType } from '../../types/User';

type Props = ListProps & Routeable;

const Artworks = (props: Props) => (
  <Container>
    <ArtworksList
      actions={[{
        icon: 'plus',
        name: 'add',
        onClick: (item) => props.history.push('/admin/physical_components/new', { artwork_id: item.id })
      }, {
        name: 'edit',
        onClick: (item) => props.history.push(`/admin/artworks/${item.id}`)
      }, {
        icon: 'times',
        name: 'delete'
      }]}
      addButton={_.defaults(props.addButton, {
        basic: false,
        color: 'green',
        location: 'top',
        onClick: () => props.history.push('/admin/artworks/new')
      })}
      collectionName='artworks'
      filters={{
        component: ListFilters,
        props: {
          filters: [{
            attributeName: 'date_descriptor',
            key: 'date_descriptor',
            label: props.t('Artworks.filters.dateDescriptor'),
            type: FilterTypes.text
          }, {
            attributeName: 'date_start',
            key: 'date_start',
            label: props.t('Artworks.filters.startDate'),
            type: FilterTypes.integer
          }, {
            attributeName: 'date_end',
            key: 'date_end',
            label: props.t('Artworks.filters.endDate'),
            type: FilterTypes.integer
          }, {
            attributeName: 'created_by_id',
            collectionName: 'users',
            key: 'created_by',
            label: props.t('Artworks.filters.createdBy'),
            objectName: 'user',
            onSearch: (search: string) => Users.fetchAll({ search, sort_by: 'name' }),
            renderOption: User.toDropdown.bind(this),
            renderSearchQuery: (user: UserType) => user.name,
            type: FilterTypes.relationship
          }, {
            attributeName: 'created_at',
            key: 'created_at',
            label: props.t('Artworks.filters.createdAt'),
            type: FilterTypes.date
          }, {
            attributeName: 'updated_by_id',
            collectionName: 'users',
            key: 'updated_by',
            label: props.t('Artworks.filters.updatedBy'),
            objectName: 'user',
            onSearch: (search: string) => Users.fetchAll({ search, sort_by: 'name' }),
            renderOption: User.toDropdown.bind(this),
            renderSearchQuery: (user: UserType) => user.name,
            type: FilterTypes.relationship
          }, {
            attributeName: 'updated_at',
            key: 'updated_at',
            label: props.t('Artworks.filters.updatedAt'),
            type: FilterTypes.date
          }, {
            attributeName: 'notes_external',
            key: 'notes_external',
            label: props.t('Artworks.filters.externalNotes'),
            type: FilterTypes.text
          }, {
            attributeName: 'notes_internal',
            key: 'notes_internal',
            label: props.t('Artworks.filters.internalNotes'),
            type: FilterTypes.text
          }, {
            attributeName: 'published',
            key: 'published',
            label: props.t('Artworks.filters.published'),
            type: FilterTypes.boolean
          }]
        }
      }}
      perPageOptions={[10, 25, 50, 100]}
      onDelete={(artwork) => ArtworksService.delete(artwork)}
      onLoad={(params) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return ArtworksService.search(params);
      }}
      onSave={(artwork) => ArtworksService.save(artwork)}
      session={{
        key: 'artworks',
        storage: sessionStorage
      }}
      sort={[{
        key: 'title',
        value: 'artwork_titles.title',
        text: 'Title'
      }, {
        key: 'date',
        value: 'date',
        text: 'Date'
      }]}
    />
  </Container>
);

export default withRouter(withMenuBar(Artworks));
