// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import ListPage from '../components/ListPage';
import PeopleService from '../services/People';
import useQualifiable from '../hooks/Qualifiable';

const People = () => {
  const { t } = useTranslation();

  const { columns, getParameters } = useQualifiable([{
    name: 'display_name',
    label: t('People.columns.name'),
    sortable: true
  }, {
    name: 'person_type',
    label: t('People.columns.type'),
    sortable: true
  }, {
    name: 'nationality',
    label: t('People.columns.nationality'),
    object: 'Person',
    group: 'Nationality',
    sortable: true
  }]);

  return (
    <ListPage
      className='people'
      collectionName='people'
      columns={columns}
      onLoad={(params) => PeopleService.fetchAll(getParameters(params))}
    />
  );
};

export default People;
