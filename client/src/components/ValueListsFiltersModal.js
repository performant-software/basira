// @flow

import React, { useState, useEffect }from 'react';
import { withTranslation } from 'react-i18next';
import { Dropdown, Form, Modal } from 'semantic-ui-react';
import { AssociatedDropdown, RemoteDropdown } from 'react-components';

import type { EditContainerProps } from 'react-components/types';
import type { Translateable } from '../types/Translateable';
import type { ValueListType } from '../types/ValueList';
import ValueListsService from '../services/ValueLists';
import ValueList from '../transforms/ValueList';


type Props = EditContainerProps & Translateable & {
  item: ValueListType
};

const ValueListsFiltersModal = (props: Props) => {

  const [columnNames, setColumnNames] = useState([]);

  useEffect(() => {
    ValueListsService.getColumnsList(props.defaults.table_filter)
      .then(resp => {
        const columnOptionsList = resp.data.columns.map(c => ({ key: c, value: c, text: c }) );
        setColumnNames(columnOptionsList);
      });
  }, []);

  return (
    <Modal
      as={Form}
      centered={false}
      className='value-lists-filters-modal'
      closeIcon
      onClose={props.onClose}
      open
      size='tiny'
    >
      <Modal.Header
        content={props.t('ValueListsFiltersModal.title.filterByGroupName')}
      />
      <Modal.Content>
        <Form.Dropdown
          clearable
          label={props.t('ValueListsFiltersModal.labels.groupName')}
          multiple
          onChange={props.onTextInputChange.bind(this, 'column_filter')}
          options={columnNames}
          placeholder={props.t('ValueListsFiltersModal.labels.selectGroupName')}
          search
          selection
          value={props.item.column_filter || ''}
          width={8}
        />
      </Modal.Content>
      { props.children }
    </Modal>
  );
};

export default withTranslation()(ValueListsFiltersModal);
