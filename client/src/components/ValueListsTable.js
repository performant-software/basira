// @flow

import { ListTable, useDataList } from '@performant-software/semantic-components';
import { ObjectJs as ObjectUtils } from '@performant-software/shared-components';
import type { EditContainerProps } from '@performant-software/shared-components/types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import Authorization from '../utils/Authorization';
import Session from '../services/Session';
import type { Translateable } from '../types/Translateable';
import type { ValueList as ValueListType } from '../types/ValueList';
import ValueListModal from './ValueListModal';
import ValueListsFiltersModal from './ValueListsFiltersModal';
import ValueListsService from '../services/ValueLists';

type Props = EditContainerProps & Translateable & {
  item: ValueListType,
  objectName: string
};

const ValueListsTable = (props: Props) => (
  <ListTable
    actions={[{
      name: 'edit'
    }, {
      name: 'copy'
    }, {
      name: 'delete',
      accept: (item) => Session.isAdmin() && item.qualifications_count === 0
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
      name: 'qualifications_count',
      label: props.t('ValueList.labels.linkedRecords'),
      sortable: true
    }]}
    filters={{
      component: ValueListsFiltersModal,
      props: {
        group_filter: '',
        object_filter: props.objectName
      }
    }}
    key={props.objectName}
    modal={{
      component: ValueListModal,
      props: {
        required: ['object', 'group', 'human_name']
      }
    }}
    // on copy, strip both ValueList id and any Qualifications id
    onCopy={(item) => ObjectUtils.without(item, 'id')}
    onDelete={(params) => ValueListsService.delete(params)}
    onLoad={(params) => ValueListsService.fetchAll({
      ...params,
      object_filter: props.objectName,
      per_page: 25
    })}
    onSave={(params) => ValueListsService.save(params)}
    resolveErrors={(error) => Authorization.resolveDeleteError(error)}
    searchable
  />
);

export default withTranslation()(useDataList(ValueListsTable));
