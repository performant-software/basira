// @flow

import React from 'react';
import { ListTable } from '@performant-software/semantic-components';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Authorization from '../../utils/Authorization';
import PeopleService from '../../services/People';
import Session from '../../services/Session';
import useQualifiable from '../../hooks/Qualifiable';
import withMenuBar from '../../hooks/MenuBar';

import type { Routeable } from '../../types/Routeable';
import type { Translateable } from '../../types/Translateable';

const People = (props: Translateable & Routeable) => {
  const { columns, getParameters } = useQualifiable([{
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
    object: 'Person',
    group: 'Nationality',
    sortable: true
  }]);

  return (
    <Container>
      <ListTable
        actions={[{
          name: 'edit',
          onClick: (item) => props.history.push(`/admin/people/${item.id}`)
        }, {
          accept: () => Session.isAdmin(),
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
        columns={columns}
        onDelete={(person) => PeopleService.delete(person)}
        onLoad={(params) => PeopleService.fetchAll(getParameters(params))}
        onSave={(person) => PeopleService.save(person)}
        resolveErrors={(error) => Authorization.resolveDeleteError(error)}
        searchable
      />
    </Container>
  );
};

export default withTranslation()(withRouter(withMenuBar(People)));
