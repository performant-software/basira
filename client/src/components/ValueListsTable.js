// @flow

import React, { useState } from 'react';
import ValueListModal from './ValueListModal';
import ValueListsFiltersModal from './ValueListsFiltersModal';
import ValueListsService from '../services/ValueLists';
import { Button, Confirm, Popup } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import { ListTable, useDataList } from 'react-components';
import type { EditContainerProps } from 'react-components/types';
import type { ValueList as ValueListType } from '../types/ValueList';
import type { Translateable } from '../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: ValueListType
};

const ValueListsTable = (props: Props) => {
  const { objectName } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState({});

  const deleteButton = (valueListItem) => (
    <Button
      basic
      compact
      icon='times circle outline'
      onClick={() => {
        setItemToBeDeleted(valueListItem);
        setShowDeleteModal(true);
      }}
      title='Delete'
    />
  );

  const deleteButtonDisabled = () => (
    <Popup
      basic
      content={props.t('ValueList.messages.deleteLinked')}
      hideOnScroll
      position='top right'
      trigger={(
        <span>
          <Button
            basic
            compact
            disabled
            icon='times circle outline'
            title='Delete'
          />
        </span>
      )}
    />
  );

  return (
    <>
      <Confirm
        content={props.t('ValueList.messages.deleteContent')}
        header={props.t('ValueList.messages.deleteHeader')}
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          ValueListsService.delete(itemToBeDeleted);
          setShowDeleteModal(false);
          setItemToBeDeleted({});
        }}
      />
      <ListTable
        actions={[{
          name: 'edit'
        }, {
          name: 'copy'
        }, {
          name: 'delete',
          render: ((valueListItem) => (
            valueListItem.qualifications_count > 0
              ? deleteButtonDisabled()
              : deleteButton(valueListItem)
          ))
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
        onLoad={(params) => ValueListsService.fetchAll({
          ...params,
          object_filter: objectName,
          per_page: 25
        })}
        onSave={(params) => ValueListsService.save(params)}
        trigger={showDeleteModal}
      />
    </>
  );
};

export default withTranslation()(useDataList(ValueListsTable));
