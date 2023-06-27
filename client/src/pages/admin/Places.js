// @flow

import React from 'react';
import { ListTable } from '@performant-software/semantic-components';
import { Container } from 'semantic-ui-react';
import Authorization from '../../utils/Authorization';
import PlacesService from '../../services/Places';
import Session from '../../services/Session';
import withMenuBar from '../../hooks/MenuBar';

import type { Routeable } from '../../types/Routeable';
import type { Translateable } from '../../types/Translateable';

const Places = (props: Routeable & Translateable) => (
  <Container>
    <ListTable
      actions={[{
        name: 'edit',
        onClick: (item) => props.history.push(`/admin/places/${item.id}`)
      }, {
        accept: () => Session.isAdmin(),
        name: 'delete'
      }]}
      addButton={{
        basic: false,
        color: 'green',
        location: 'top',
        onClick: () => props.history.push('/admin/places/new')
      }}
      className='places'
      collectionName='places'
      columns={[{
        name: 'name',
        label: props.t('Places.columns.name'),
        sortable: true
      }, {
        name: 'place_type',
        label: props.t('Places.columns.type'),
        sortable: true
      }, {
        name: 'city',
        label: props.t('Places.columns.city'),
        sortable: true
      }, {
        name: 'state',
        label: props.t('Places.columns.state'),
        sortable: true
      }, {
        name: 'country',
        label: props.t('Places.columns.country'),
        sortable: true
      }]}
      onDelete={(place) => PlacesService.delete(place)}
      onLoad={(params) => PlacesService.fetchAll(params)}
      onSave={(place) => PlacesService.save(place)}
      resolveErrors={(error) => Authorization.resolveDeleteError(error)}
      searchable
    />
  </Container>
);

export default withMenuBar(Places);
