// @flow

import { FilterTypes, ItemList, ListFilters } from '@performant-software/semantic-components';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import _ from 'underscore';
import ArtworksService from '../../services/Artworks';
import Authorization from '../../utils/Authorization';
import PermissionsService from '../../services/Permissions';
import Thumbnail from '../../components/Thumbnail';
import User from '../../transforms/User';
import Users from '../../services/Users';
import withMenuBar from '../../hooks/MenuBar';
import './Artworks.css';

import type { ListProps } from '@performant-software/semantic-components/types';
import type { Routeable } from '../../types/Routeable';
import type { Translateable } from '../../types/Translateable';
import type { User as UserType } from '../../types/User';

type Props = ListProps & Routeable & Translateable;

const Artworks = (props: Props) => (
  <Container>
    <ItemList
      actions={[{
        name: 'edit',
        onClick: (item) => props.history.push(`/admin/artworks/${item.id}`)
      }, {
        accept: (item) => PermissionsService.canDeleteArtwork(item),
        icon: 'times',
        name: 'delete'
      }, {
        basic: true,
        label: props.t('Artworks.buttons.addPhysicalComponent'),
        icon: 'plus',
        name: 'add',
        onClick: (item) => props.history.push('/admin/physical_components/new', { artwork_id: item.id })
      }]}
      addButton={_.defaults(props.addButton, {
        basic: false,
        color: 'green',
        location: 'top',
        onClick: () => props.history.push('/admin/artworks/new')
      })}
      className='artworks'
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
      onDelete={(artwork) => ArtworksService.delete(artwork)}
      onLoad={(params) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return ArtworksService.search(params);
      }}
      onSave={(artwork) => ArtworksService.save(artwork)}
      perPageOptions={[10, 25, 50, 100]}
      renderHeader={(item) => item.primary_title && item.primary_title.title && (
        <Header
          as='h3'
          content={item.primary_title && item.primary_title.title}
        />
      )}
      renderImage={(item) => item.primary_attachment && (
        <Thumbnail
          src={item.primary_attachment.thumbnail_url}
          style={{ width: '100%' }}
        />
      )}
      renderMeta={(item) => (
        <>
          <div className='main-meta'>
            {item.date_descriptor}
          </div>
          <div className='additional-meta'>
            {item.created_by.name && (
              <div>
                <span className='meta-label'>
                  {props.t('Artworks.filters.createdBy')}
                  {': '}
                </span>
                {item.created_by.name}
              </div>
            )}
            {item.updated_by.name && (
              <div>
                <span className='meta-label'>
                  {props.t('Artworks.filters.updatedBy')}
                  {': '}
                </span>
                {item.updated_by.name}
              </div>
            )}
            {item.created_at && (
              <div>
                <span className='meta-label'>
                  {props.t('Artworks.filters.createdAt')}
                  {': '}
                </span>
                {new Date(item.created_at).toLocaleString('en-US')}
              </div>
            )}
            {item.updated_at && (
              <div>
                <span className='meta-label'>
                  {props.t('Artworks.filters.updatedAt')}
                  {': '}
                </span>
                {new Date(item.updated_at).toLocaleString('en-US')}
              </div>
            )}
          </div>
        </>
      )}
      resolveErrors={(error) => Authorization.resolveDeleteError(error)}
      session={{
        key: 'artworks',
        storage: sessionStorage
      }}
      sort={[{
        key: 'title',
        value: 'artwork_titles.title',
        text: props.t('Artwork.titles.columns.title')
      }, {
        key: 'date',
        value: 'created_at',
        text: props.t('Artwork.labels.creationDate')
      }]}
    />
  </Container>
);

export default withRouter(withMenuBar(Artworks));
