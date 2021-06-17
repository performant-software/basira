// @flow

import React from 'react';

import { ListTable } from 'react-components';
import ValueListModal from '../../components/ValueListModal';
import withMenuBar from '../../hooks/MenuBar';
import ValueListsService from '../../services/ValueLists';
import {
  Container,
  Header
} from 'semantic-ui-react';

import type { EditContainerProps } from 'react-components/types';
import type { ValueList as ValueListType } from '../../types/ValueList';
import type { Translateable } from '../../types/Translateable';
import useEditPage from './EditPage';

type Props = EditContainerProps & Translateable & {
  item: ValueListType
};

const ValueLists = (props: Props) => {

const ValueLists = () => (
  <div>ValueLists</div>
);
    <Container>
      <Header>{props.t('Admin.menu.valueLists')}</Header>
      <ListTable
        actions={[{
          name: 'edit'
        }, {
          name: 'copy'
        }, {
          name: 'delete'
        }]}
        addButton={() => true}
        className='value-lists-table'
        collectionName='value_lists'
        columns={[{
          name: 'table',
          label: props.t('ValueList.labels.objectName'),
          sortable: true
        }, {
          name: 'column',
          label: props.t('ValueList.labels.groupName'),
          sortable: true
        }, {
          name: 'value',
          label: props.t('ValueList.labels.humanName'),
          sortable: true
        }, {
          name: 'comment',
          label: props.t('ValueList.labels.comment'),
          sortable: true
        }]}
        modal={{
          component: ValueListModal,
          props: {
            required: ['table', 'column', 'value']
          }
        }}
        onDelete={(params) => ValueListsService.delete(params)}
        onLoad={(params) => ValueListsService.fetchAll(params)}
        onSave={(params) => ValueListsService.save(params)}
      />
    </Container>

export default withMenuBar(ValueLists);
