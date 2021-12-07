// @flow

import React from 'react';
import { ListTable } from 'react-components';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PeopleService from '../../services/People';
import Qualifiables from '../../utils/Qualifiables';
import withMenuBar from '../../hooks/MenuBar';

import type { Routeable } from '../../types/Routeable';
import type { Translateable } from '../../types/Translateable';

const People = (props: Translateable & Routeable) => (
  <Container>
    <ListTable
      actions={[{
        name: 'edit',
        onClick: (item) => props.history.push(`/admin/people/${item.id}`)
      }, {
        name: 'delete'
      }]}
      addButton={{
        basic: false,
        color: 'green',
        location: 'top',
        onClick: () => props.history.push('/admin/people/new')
      }}
      className='people'
      collectionName='people'
      columns={[{
        name: 'display_name',
        label: props.t('People.columns.name'),
        sortable: true
      }, {
        name: 'person_type',
        label: props.t('People.columns.type'),
        sortable: true
      }, {
        name: 'nationality',
        label: props.t('People.columns.nationality'),
        resolve: (person) => Qualifiables.getValueListValue(person, 'Person', 'Nationality'),
        sortable: true
      }]}
      onDelete={(person) => PeopleService.delete(person)}
      onLoad={(params) => PeopleService.fetchAll(params)}
      onSave={(person) => PeopleService.save(person)}
    />
  </Container>
);

export default withTranslation()(withRouter(withMenuBar(People)));
