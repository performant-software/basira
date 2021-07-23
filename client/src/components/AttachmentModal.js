// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Modal, Segment } from 'semantic-ui-react';
import _ from 'underscore';
import ValueListDropdown from './ValueListDropdown';

import type { EditContainerProps } from 'react-components/types';
import type { Attachment } from '../types/Attachment';
import type { Translateable } from '../types/Translateable';

type Props = EditContainerProps & Translateable & {
  extra?: string,
  item: Attachment
};

const AttachmentModal = (props: Props) => (
  <Modal
    as={Form}
    centered={false}
    noValidate
    open
  >
    <Modal.Header
      content={props.t('AttachmentModal.title.edit')}
    />
    <Modal.Content>
      <ValueListDropdown
        {...props}
        group='Image Rights'
        label={props.t('AttachmentModal.labels.imageRights')}
        object='Attachment'
      />
      <ValueListDropdown
        {...props}
        group='Image Source'
        label={props.t('AttachmentModal.labels.imageSource')}
        object='Attachment'
      />
      <ValueListDropdown
        {...props}
        group='Photographer'
        label={props.t('AttachmentModal.labels.photographer')}
        object='Attachment'
      />
      { props.extra && (
        <Segment>
          { _.map(props.extra.split('\n'), (extra) => (
            <div>{ extra }</div>
          ))}
        </Segment>
      )}
    </Modal.Content>
    { props.children }
  </Modal>
);

export default withTranslation()(AttachmentModal);
