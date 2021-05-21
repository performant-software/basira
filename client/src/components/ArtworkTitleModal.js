// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Modal } from 'semantic-ui-react';

import type { EditContainerProps } from 'react-components/types';
import type { ArtworkTitle } from '../types/ArtworkTitle';
import type { Translateable } from '../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: ArtworkTitle
};

const ArtworkTitleModal = (props: Props) => (
  <Modal
    as={Form}
    className='artwork-title-modal'
    centered={false}
    noValidate
    open
  >
    <Modal.Header
      content={props.item.id
        ? props.t('ArtworkTitleModal.title.edit')
        : props.t('ArtworkTitleModal.title.add')}
    />
    <Modal.Content>
      <Form.Input
        error={props.isError('title')}
        label={props.t('ArtworkTitleModal.labels.title')}
        onChange={props.onTextInputChange.bind(this, 'title')}
        required={props.isRequired('title')}
        value={props.item.title || ''}
      />
      <Form.Input
        error={props.isError('title_type')}
        label={props.t('ArtworkTitleModal.labels.type')}
        onChange={props.onTextInputChange.bind(this, 'title_type')}
        required={props.isRequired('title_type')}
        value={props.item.title_type || ''}
      />
      <Form.TextArea
        error={props.isError('notes')}
        label={props.t('ArtworkTitleModal.labels.notes')}
        onChange={props.onTextInputChange.bind(this, 'notes')}
        required={props.isRequired('notes')}
        value={props.item.notes || ''}
      />
      <Form.Checkbox
        checked={props.item.primary}
        label={props.t('ArtworkTitleModal.labels.primary')}
        onChange={props.onCheckboxInputChange.bind(this, 'primary')}
      />
    </Modal.Content>
    { props.children }
  </Modal>
);

export default withTranslation()(ArtworkTitleModal);
