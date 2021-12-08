// @flow

import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Modal } from 'semantic-ui-react';
import ValueListsService from '../services/ValueLists';

import type { EditContainerProps } from 'react-components/types';
import type { Translateable } from '../types/Translateable';
import type { ValueList as ValueListType } from '../types/ValueList';

type Props = EditContainerProps & Translateable & {
  item: ValueListType,
  group_filter: string,
  object_filter: string,
  onClose: () => void
};

const ValueListsFiltersModal = (props: Props) => {
  const [groupNames, setGroupNames] = useState([]);

  useEffect(() => {
    ValueListsService.getGroupsList(props.object_filter)
      .then((resp) => {
        const groupOptionsList = resp.data.groups.map((c) => ({ key: c, value: c, text: c }));
        setGroupNames(groupOptionsList);
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
          onChange={props.onTextInputChange.bind(this, 'group_filter')}
          options={groupNames}
          placeholder={props.t('ValueListsFiltersModal.labels.selectGroupName')}
          search
          selection
          value={props.item.group_filter || ''}
          width={8}
        />
      </Modal.Content>
      { props.children }
    </Modal>
  );
};

export default withTranslation()(ValueListsFiltersModal);
