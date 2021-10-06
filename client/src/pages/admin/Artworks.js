// @flow

import React from 'react';
import { ItemList } from 'react-components';
import { withRouter } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import _ from 'underscore';
import Thumbnail from '../../components/Thumbnail';
import ArtworksService from '../../services/Artworks';
import withMenuBar from '../../hooks/MenuBar';
import './Artworks.css';

import type { ListProps } from 'react-components/types';
import type { Routeable } from '../../types/Routeable';

type Props = ListProps & Routeable;

const Artworks = (props: Props) => (
  <Container>
    <ItemList
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
      className='artworks'
      items={props.items}
      onDelete={(artwork) => ArtworksService.delete(artwork)}
      onLoad={(params) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return ArtworksService.fetchAll({
          ...params,
          per_page: 12,
        });
      }}
      onSave={(artwork) => ArtworksService.save(artwork)}
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
      renderMeta={(item) => item.date_descriptor}
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
