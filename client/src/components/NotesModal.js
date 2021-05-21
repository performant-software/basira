// @flow

import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Button,
  Form,
  Modal,
  TextArea
} from 'semantic-ui-react';

import type { Translateable } from '../types/Translateable';

type Props = Translateable & {
  notes: ?string,
  onClose: () => void,
  onSave: (e: Event, { value: ?string }) => void,
  open?: boolean
};

const NotesModal = (props: Props) => {
  const [notes, setNotes] = useState(props.notes);

  return (
    <Modal
      as={Form}
      centered={false}
      open={props.open}
      noValidate
    >
      <Modal.Header
        content={props.t('NotesModal.title')}
      />
      <Modal.Content>
        <TextArea
          onChange={(e, { value }) => setNotes(value)}
          rows={5}
          value={notes}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          content={props.t('Common.buttons.save')}
          primary
          onClick={(e) => {
            props.onSave(e, { value: notes });
            props.onClose();
          }}
        />
        <Button
          content={props.t('Common.buttons.cancel')}
          inverted
          primary
          onClick={() => props.onClose()}
        />
      </Modal.Actions>
    </Modal>
  );
};

NotesModal.defaultProps = {
  open: true
};

export default withTranslation()(NotesModal);
