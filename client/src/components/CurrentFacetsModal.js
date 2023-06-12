// @flow

import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import CurrentFacetLabels, { type Item } from './CurrentFacetLabels';

type Props = {
  items: Array<Item>,
  onClose: () => void,
  open?: boolean
};

const CurrentFacetsModal = (props: Props) => (
  <Modal
    centered={false}
    open={props.open}
  >
    <Modal.Header
      content={'Current Facets'}
    />
    <Modal.Content>
      <CurrentFacetLabels
        items={props.items}
      />
    </Modal.Content>
    <Modal.Actions>
      <Button
        content={'Done'}
        onClick={props.onClose}
        primary
      />
    </Modal.Actions>
  </Modal>
);

CurrentFacetsModal.defaultProps = {
  open: undefined
};

export default CurrentFacetsModal;
