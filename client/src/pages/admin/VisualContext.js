// @flow

import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import ItemLabel from '../../components/ItemLabel';
import RecordHeader from '../../components/RecordHeader';
import SimpleEditPage from '../../components/SimpleEditPage';
import useEditPage from './EditPage';
import ValueListDropdown from '../../components/ValueListDropdown';
import VisualContextsService from '../../services/VisualContexts';
import withMenuBar from '../../hooks/MenuBar';
import withSingleImage from '../../hooks/Image';

import type { EditContainerProps } from 'react-components/types';
import type { ImageProps } from '../../hooks/Image';
import type { VisualContext as VisualContextType } from '../../types/VisualContext';
import type { Translateable } from '../../types/Translateable';
import type { Routeable } from '../../types/Routeable';

type Props = EditContainerProps & ImageProps & Routeable & Translateable & {
  item: VisualContextType
};

const Tabs = {
  details: 'details',
  subjectMatter: 'Subject Matter',
  notes: 'Notes'
};

const VisualContext = (props: Props) => {
  /**
   * Sets the physical_component_id from the state.
   */
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
          image={props.image && props.image.file_url}
          includeNotesButton={false}
          includePublishButton={false}
          onFileDelete={props.onDeleteImage}
          onFileUpload={props.onSaveImage}
        />
      </SimpleEditPage.Header>
      <SimpleEditPage.Tab
        key={Tabs.details}
        name={props.t('VisualContext.tabs.details')}
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
      </SimpleEditPage.Tab>
      <SimpleEditPage.Tab
        key={Tabs.subjectMatter}
        name={props.t('VisualContext.tabs.subjectMatter')}
      >
        <ValueListDropdown
          {...props}
          group='General Subject/Genre'
          label={props.t('VisualContext.labels.generalSubjectGenre')}
          multiple
          object='Visual Context'
        />
        <ValueListDropdown
          {...props}
          group='Subject Cultural Context'
          label={props.t('VisualContext.labels.subjectCulturalContext')}
          multiple
          object='Visual Context'
        />
        <ValueListDropdown
          {...props}
          group='Specific Subject/Iconography'
          label={props.t('VisualContext.labels.specificSubjectIconography')}
          multiple
          object='Visual Context'
        />
        <Form.Checkbox
          checked={props.item.beta}
          error={props.isError('beta')}
          label={props.t('VisualContext.labels.beta')}
          onChange={props.onCheckboxInputChange.bind(this, 'beta')}
          required={props.isRequired('beta')}
          toggle
        />
      </SimpleEditPage.Tab>
      <SimpleEditPage.Tab
        key={Tabs.notes}
        name={props.t('VisualContext.tabs.notes')}
      >
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

export default useEditPage(withRouter(withMenuBar(withSingleImage(VisualContext))), {
  getArtworkId: (item) => item.artwork_id,
  onLoad: (id) => VisualContextsService.fetchOne(id).then(({ data }) => data.visual_context),
  onSave: (pc) => VisualContextsService.save(pc)
});
