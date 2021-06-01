// @flow

import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import _ from 'underscore';
import File from '../../transforms/File';
import ItemLabel from '../../components/ItemLabel';
import RecordHeader from '../../components/RecordHeader';
import SimpleEditPage from '../../components/SimpleEditPage';
import useEditPage from './EditPage';
import VisualContextsService from '../../services/VisualContexts';
import withMenuBar from '../../hooks/MenuBar';

import type { EditContainerProps } from 'react-components/types';
import type { VisualContext as VisualContextType } from '../../types/VisualContext';
import type { Translateable } from '../../types/Translateable';
import type { Routeable } from '../../types/Routeable';

type Props = EditContainerProps & Routeable & Translateable & {
  item: VisualContextType
};

const Tabs = {
  details: 'details'
};

const VisualContext = (props: Props) => {
  /**
   * Deletes the attached image.
   *
   * @type {function(): void}
   */
  const onDeleteImage = useCallback(() => {
    const image = getImage();
    if (image) {
      props.onDeleteChildAssociation('attachments', image);
    }
  }, [props.onDeleteChildAssociation]);

  /**
   * Returns the first primary, non-deleted image attachment.
   *
   * @type {function(): *}
   */
  const getImage = useCallback(
    () => _.find(props.item.attachments, (a) => a.primary && !a._destroy),
    [props.item.attachments]
  );

  /**
   * Returns the primary image URL.
   *
   * @returns {*|string|string}
   */
  const getImageUrl = () => {
    const image = getImage();
    return image && image.file_url;
  };

  useEffect(() => {
    if (props.location.state && props.location.state.physical_component_id) {
      props.onSetState({ physical_component_id: props.location.state.physical_component_id });
    }
  }, []);

  return (
    <SimpleEditPage
      artworkId={props.item.artwork_id}
      errors={props.errors}
      loading={props.loading}
      onSave={props.onSave}
      type={props.item.id ? undefined : props.t('Common.labels.visualContext')}
    >
      <SimpleEditPage.Header>
        <RecordHeader
          description={(
            <ItemLabel
              content={props.t('Common.labels.visualContext')}
              level={2}
            />
          )}
          header={props.item.name}
          image={getImageUrl()}
          includeNotesButton={false}
          includePublishButton={false}
          onFileDelete={onDeleteImage}
          onFileUpload={(files) => {
            onDeleteImage();
            props.onSaveChildAssociation('attachments', File.toAttachment(_.first(files), true));
          }}
        />
      </SimpleEditPage.Header>
      <SimpleEditPage.Tab
        key={Tabs.details}
        name={props.t('Common.tabs.details')}
      >
        <Form.Input
          error={props.isError('name')}
          label={props.t('VisualContext.labels.name')}
          onChange={props.onTextInputChange.bind(this, 'name')}
          required={props.isRequired('name')}
          value={props.item.name || ''}
        />
        <Form.Input
          error={props.isError('height')}
          label={props.t('VisualContext.labels.height')}
          onChange={props.onTextInputChange.bind(this, 'height')}
          required={props.isRequired('height')}
          value={props.item.height || ''}
        />
        <Form.Input
          error={props.isError('width')}
          label={props.t('VisualContext.labels.width')}
          onChange={props.onTextInputChange.bind(this, 'width')}
          required={props.isRequired('width')}
          value={props.item.width || ''}
        />
        <Form.Input
          error={props.isError('depth')}
          label={props.t('VisualContext.labels.depth')}
          onChange={props.onTextInputChange.bind(this, 'depth')}
          required={props.isRequired('depth')}
          value={props.item.depth || ''}
        />
        <Form.TextArea
          error={props.isError('notes')}
          label={props.t('VisualContext.labels.notes')}
          onChange={props.onTextInputChange.bind(this, 'notes')}
          required={props.isRequired('notes')}
          value={props.item.notes || ''}
        />
      </SimpleEditPage.Tab>
    </SimpleEditPage>
  );
};

export default useEditPage(withRouter(withMenuBar(VisualContext)), {
  getArtworkId: (item) => item.artwork_id,
  onLoad: (id) => VisualContextsService.fetchOne(id).then(({ data }) => data.visual_context),
  onSave: (pc) => VisualContextsService.save(pc)
});
