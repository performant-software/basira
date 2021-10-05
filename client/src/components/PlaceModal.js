// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Modal } from 'semantic-ui-react';
import PlaceForm from './PlaceForm';

import type { EditContainerProps } from 'react-components/types';
import type { Place } from '../types/Place';
import type { Translateable } from '../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: Place
};

const PlaceModal = (props: Props) => (
  <Modal
    as={Form}
    centered={false}
    noValidate
    open
  >
    <Modal.Header
      content={props.item.id
        ? props.t('PlaceModal.title.edit')
        : props.t('PlaceModal.title.add')}
    />
    <Modal.Content>
      <PlaceForm
        {...props}
      />
    </Modal.Content>
    { props.children }
  </Modal>
);

export default withTranslation()(PlaceModal);
