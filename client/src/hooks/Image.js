// @flow

import React, {
  useCallback,
  useMemo,
  useState,
  type ComponentType
} from 'react';
import { EditModal } from '@performant-software/semantic-components';
import { type EditContainerProps } from '@performant-software/shared-components/types';
import _ from 'underscore';
import AttachmentModal from '../components/AttachmentModal';
import File from '../transforms/File';

import type { Attachable } from '../types/concerns/Attachable';
import type { Attachment } from '../types/Attachment';

type Props = EditContainerProps & {
  item: Attachable
};

const withSingleImage = (WrappedComponent: ComponentType<any>) => (props: Props) => {
  const [editModal, setEditModal] = useState(false);

  /**
   * Returns the first primary, non-deleted image attachment.
   *
   * @type {function(): *}
   */
  const image = useMemo(
    () => _.find(props.item.attachments, (a) => a.primary && !a._destroy),
    [props.item.attachments]
  );

  /**
   * Deletes the attached image.
   *
   * @type {function(): void}
   */
  const onDeleteImage = useCallback(() => {
    if (image) {
      props.onDeleteChildAssociation('attachments', image);
    }
  }, [image, props.onDeleteChildAssociation]);

  /**
   * Opens the edit modal for the current image.
   *
   * @type {(function(): void)|*}
   */
  const onEditImage = useCallback(() => {
    if (image) {
      setEditModal(true);
    }
  }, [image]);

  /**
   * Saves the first file in the passed array as an attachment.
   *
   * @type {function(*=): void}
   */
  const onSaveImage = useCallback((files) => {
    onDeleteImage();
    props.onSaveChildAssociation('attachments', File.toAttachment(_.first(files), true));
  }, [onDeleteImage, props.onSaveChildAssociation]);

  return (
    <>
      <WrappedComponent
        {...props}
        image={image}
        onDeleteImage={onDeleteImage}
        onEditImage={onEditImage}
        onSaveImage={onSaveImage}
      />
      { editModal && (
        <EditModal
          component={AttachmentModal}
          item={image}
          onClose={() => setEditModal(false)}
          onSave={(item) => {
            props.onSaveChildAssociation('attachments', item);
            setEditModal(false);
            return Promise.resolve();
          }}
        />
      )}
    </>
  );
};

export default withSingleImage;

export type ImageProps = {
  image: Attachment,
  onDeleteImage: () => void,
  onEditImage: () => void,
  onSaveImage: (files: Array<any>) => void
};
