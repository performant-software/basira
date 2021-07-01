// @flow

import React from 'react';
import ValueListModal from './ValueListModal';
import ValueListsFiltersModal from './ValueListsFiltersModal';
import { withTranslation } from 'react-i18next';
import { DataTable, EmbeddedList, ListTable } from 'react-components';
import { Tab } from 'semantic-ui-react';
import ValueListsService from '../services/ValueLists';
import {
  Container,
  Header
} from 'semantic-ui-react';
import _ from 'underscore';

import type { EditContainerProps } from 'react-components/types';
import { useDataList } from 'react-components';
import type { ValueList as ValueListType } from '../../types/ValueList';
import type { Translateable } from '../../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: ValueListType
};

const ValueListsTable = (props: Props) => {
  const { objectName } = props;

  return (
    <ListTable
      actions={[{
        name: 'edit'
      }, {
        name: 'copy'
      }, {
        name: 'delete'
      }]}
      className='value-lists-table'
      collectionName='value_lists'
      columns={[{
        name: 'group',
        label: props.t('ValueList.labels.groupName'),
        sortable: true
      }, {
        name: 'human_name',
        label: props.t('ValueList.labels.humanName'),
        sortable: true
      }, {
        name: 'comment',
        label: props.t('ValueList.labels.comment'),
        sortable: true
      }, {
        name: 'qualifiables_count',
        label: props.t('ValueList.labels.linkedRecords'),
        sortable: false
      }]}
      filters={{
        component: ValueListsFiltersModal,
        props: {
          group_filter: '',
          object_filter: objectName
        }
      }}
      key={objectName}
      modal={{
        component: ValueListModal,
        props: {
          required: ['object', 'group', 'human_name']
        }
      }}
      onDelete={(params) => ValueListsService.delete(params)}
      onLoad={(params) => ValueListsService.fetchAll({
        object_filter: objectName,
        ...params
      })}
      onSave={(params) => ValueListsService.save(params)}
    />
  );
};

export default withTranslation()(useDataList(ValueListsTable));
