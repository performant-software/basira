// @flow

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import _ from 'underscore';
import ArtworksList from '../../components/ArtworksList';
import ArtworksService from '../../services/Artworks';
import withMenuBar from '../../hooks/MenuBar';
import './Artworks.css';

import type { ListProps } from 'react-components/types';
import type { Routeable } from '../../types/Routeable';

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
      onDelete={(artwork) => ArtworksService.delete(artwork)}
      onLoad={(params) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return ArtworksService.fetchAll({
          ...params,
          per_page: 12,
        });
      }}
      onSave={(artwork) => ArtworksService.save(artwork)}
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
