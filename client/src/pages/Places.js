// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import ListPage from '../components/ListPage';
import PlacesService from '../services/Places';

const Places = () => {
  const { t } = useTranslation();

  return (
    <ListPage
      className='places'
      collectionName='places'
      columns={[{
        name: 'name',
        label: t('Places.columns.name'),
        sortable: true
      }, {
        name: 'place_type',
        label: t('Places.columns.type'),
        sortable: true
      }, {
        name: 'city',
        label: t('Places.columns.city'),
        sortable: true
      }, {
        name: 'state',
        label: t('Places.columns.state'),
        sortable: true
      }, {
        name: 'country',
        label: t('Places.columns.country'),
        sortable: true
      }]}
      onLoad={(params) => PlacesService.fetchAll(params)}
    />
  );
};

export default Places;
