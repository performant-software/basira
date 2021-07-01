// @flow

import React, { useEffect, useState } from 'react';
import { ListTable } from 'react-components';
import { Tab } from 'semantic-ui-react';
import ValueListsTable from '../../components/ValueListsTable';
import withMenuBar from '../../hooks/MenuBar';
import ValueListsService from '../../services/ValueLists';
import {
  Container,
  Header
} from 'semantic-ui-react';
import _ from 'underscore';

import type { EditContainerProps } from 'react-components/types';
import type { ValueList as ValueListType } from '../../types/ValueList';
import type { Translateable } from '../../types/Translateable';
import useEditPage from './EditPage';

type Props = EditContainerProps & Translateable & {
  item: ValueListType
};

const ValueLists = (props: Props) => {
  const [objectsList, setObjectsList] = useState([]);

  useEffect(() => {
    ValueListsService.getObjectsList()
    .then(response => setObjectsList(response.data.objects));
  }, []);

  const panes = objectsList.map(objectName => ({
    menuItem: objectName,
    render: () => (<Tab.Pane attached={false}> <ValueListsTable objectName={objectName} /> </Tab.Pane>)
  }));

  return (
    <Container>
      <Header as='h2'>{props.t('Admin.menu.valueLists')}</Header>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </Container>
  );
};

export default useEditPage(withMenuBar(ValueLists), {
  onLoad: () => ValueListsService.getObjectsList(),
  onSave: () => ValueListsService.save()
});
