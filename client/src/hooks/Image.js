// @flow

import React, { useCallback, useMemo, type ComponentType } from 'react';
import _ from 'underscore';
import File from '../transforms/File';

import type { EditContainerProps } from 'react-components/types';
import type { Attachable } from '../types/concerns/Attachable';
import type { Attachment } from '../types/Attachment';

type Props = EditContainerProps & {
  item: Attachable
};

const withSingleImage = (WrappedComponent: ComponentType<any>) => (props: Props) => {
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
   *
   * @type {function(*=): void}
   */
  const onSaveImage = useCallback((files) => {
    onDeleteImage();
    props.onSaveChildAssociation('attachments', File.toAttachment(_.first(files), true));
  }, [onDeleteImage, props.onSaveChildAssociation]);

  return (
    <WrappedComponent
      {...props}
      image={image}
      onDeleteImage={onDeleteImage}
      onSaveImage={onSaveImage}
    />
  );
};

export default withSingleImage;

export type ImageProps = {
  image: Attachment,
  onDeleteImage: () => void,
  onSaveImage: (files: Array<any>) => void
};
