// @flow

import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Grid } from 'semantic-ui-react';
import DocumentsService from '../../services/Documents';
import ItemLabel from '../../components/ItemLabel';
import LocationOfFastenings from '../../resources/LocationOfFastenings.json';
import RecordHeader from '../../components/RecordHeader';
import Section from '../../components/Section';
import SimpleEditPage from '../../components/SimpleEditPage';
import useEditPage from './EditPage';
import withMenuBar from '../../hooks/MenuBar';
import withSingleImage from '../../hooks/Image';

import type { EditContainerProps } from 'react-components/types';
import type { ImageProps } from '../../hooks/Image';
import type { Document as DocumentType } from '../../types/Document';
import type { Translateable } from '../../types/Translateable';
import type { Routeable } from '../../types/Routeable';

type Props = EditContainerProps & ImageProps & Routeable & Translateable & {
  item: DocumentType
};

const Tabs = {
  details: 'details',
  external: 'external',
  internal: 'internal'
};

const Document = (props: Props) => {
  /**
   * Sets the visual_context_id from the state.
   */
  useEffect(() => {
    if (props.location.state && props.location.state.visual_context_id) {
      props.onSetState({ visual_context_id: props.location.state.visual_context_id });
    }
  }, []);

  return (
    <SimpleEditPage
      artworkId={props.item.artwork_id}
      errors={props.errors}
      loading={props.loading}
      onSave={props.onSave}
      type={props.item.id ? undefined : props.t('Common.labels.document')}
    >
      <SimpleEditPage.Header>
        <RecordHeader
          description={(
            <ItemLabel
              content={props.t('Common.labels.document')}
              level={3}
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
        name={props.t('Common.tabs.details')}
      >
        <Form.Input
          error={props.isError('name')}
          label={props.t('Document.labels.name')}
          onChange={props.onTextInputChange.bind(this, 'name')}
          required={props.isRequired('name')}
          value={props.item.name || ''}
        />
        <Form.TextArea
          error={props.isError('notes')}
          label={props.t('Document.labels.notes')}
          onChange={props.onTextInputChange.bind(this, 'notes')}
          required={props.isRequired('notes')}
          value={props.item.notes || ''}
        />
      </SimpleEditPage.Tab>
      <SimpleEditPage.Tab
        key={Tabs.external}
        name={props.t('Document.tabs.external')}
      >
        <Grid
          columns={2}
        >
          <Grid.Column>
            <Section
              title={props.t('Document.sections.binding')}
            >
              <Form.Checkbox
                checked={props.item.sewing_supports_visible}
                error={props.isError('sewing_supports_visible')}
                label={props.t('Document.labels.sewingSupportsVisible')}
                onChange={props.onCheckboxInputChange.bind(this, 'sewing_supports_visible')}
                required={props.isRequired('sewing_supports_visible')}
                toggle
              />
              <Form.Input
                error={props.isError('number_sewing_supports')}
                label={props.t('Document.labels.numberSewingSupports')}
                onChange={props.onTextInputChange.bind(this, 'number_sewing_supports')}
                required={props.isRequired('number_sewing_supports')}
                value={props.item.number_sewing_supports || ''}
              />
              <Form.Input
                error={props.isError('number_fastenings')}
                label={props.t('Document.labels.numberFastenings')}
                onChange={props.onTextInputChange.bind(this, 'number_fastenings')}
                required={props.isRequired('number_fastenings')}
                value={props.item.number_fastenings || ''}
              />
              <Form.Dropdown
                error={props.isError('location_of_fastenings')}
                label={props.t('Document.labels.locationOfFastenings')}
                onChange={props.onTextInputChange.bind(this, 'location_of_fastenings')}
                options={LocationOfFastenings}
                required={props.isRequired('location_of_fastenings')}
                selection
                value={props.item.location_of_fastenings || ''}
              />
              <Form.Checkbox
                checked={props.item.inscriptions_on_binding}
                error={props.isError('inscriptions_on_binding')}
                label={props.t('Document.labels.inscriptionsOnBinding')}
                onChange={props.onCheckboxInputChange.bind(this, 'inscriptions_on_binding')}
                required={props.isRequired('inscriptions_on_binding')}
                toggle
              />
              <Form.Input
                error={props.isError('inscription_text')}
                label={props.t('Document.labels.inscriptionText')}
                onChange={props.onTextInputChange.bind(this, 'inscription_text')}
                required={props.isRequired('inscription_text')}
                value={props.item.inscription_text || ''}
              />
            </Section>
          </Grid.Column>
          <Grid.Column>
            <Section
              title={props.t('Document.sections.endband')}
            >
              <Form.Checkbox
                checked={props.item.endband_present}
                error={props.isError('endband_present')}
                label={props.t('Document.labels.endbandPresent')}
                onChange={props.onCheckboxInputChange.bind(this, 'endband_present')}
                required={props.isRequired('endband_present')}
                toggle
              />
            </Section>
            <Section
              title={props.t('Document.sections.foreEdges')}
            >
              <Form.Checkbox
                checked={props.item.uncut_fore_edges}
                error={props.isError('uncut_fore_edges')}
                label={props.t('Document.labels.uncutForeEdges')}
                onChange={props.onCheckboxInputChange.bind(this, 'uncut_fore_edges')}
                required={props.isRequired('uncut_fore_edges')}
                toggle
              />
              <Form.Input
                error={props.isError('fore_edge_text')}
                label={props.t('Document.labels.foreEdgeText')}
                onChange={props.onTextInputChange.bind(this, 'fore_edge_text')}
                required={props.isRequired('fore_edge_text')}
                value={props.item.fore_edge_text || ''}
              />
            </Section>
            <Section
              title={props.t('Document.sections.bookmarks')}
            >
              <Form.Input
                error={props.isError('bookmarks_registers')}
                label={props.t('Document.labels.bookmarksRegisters')}
                onChange={props.onTextInputChange.bind(this, 'bookmarks_registers')}
                required={props.isRequired('bookmarks_registers')}
                value={props.item.bookmarks_registers || ''}
              />
            </Section>
          </Grid.Column>
        </Grid>
      </SimpleEditPage.Tab>
      <SimpleEditPage.Tab
        key={Tabs.internal}
        name={props.t('Document.tabs.internal')}
      >
        <Grid
          columns={2}
        >
          <Grid.Column>
            <Section
              title={props.t('Document.sections.layout')}
            >
              <Form.Input
                error={props.isError('text_columns')}
                label={props.t('Document.labels.textColumns')}
                onChange={props.onTextInputChange.bind(this, 'text_columns')}
                required={props.isRequired('text_columns')}
                value={props.item.text_columns || ''}
              />
              <Form.Checkbox
                checked={props.item.ruling}
                error={props.isError('ruling')}
                label={props.t('Document.labels.ruling')}
                onChange={props.onCheckboxInputChange.bind(this, 'ruling')}
                required={props.isRequired('ruling')}
                toggle
              />
              <Form.Checkbox
                checked={props.item.rubrication}
                error={props.isError('rubrication')}
                label={props.t('Document.labels.rubrication')}
                onChange={props.onCheckboxInputChange.bind(this, 'rubrication')}
                required={props.isRequired('rubrication')}
                toggle
              />
            </Section>
          </Grid.Column>
          <Grid.Column>
            <Section
              title={props.t('Document.sections.text')}
            >
              <Form.Input
                error={props.isError('identity')}
                label={props.t('Document.labels.identity')}
                onChange={props.onTextInputChange.bind(this, 'identity')}
                required={props.isRequired('identity')}
                value={props.item.identity || ''}
              />
              <Form.TextArea
                error={props.isError('transcription')}
                label={props.t('Document.labels.transcription')}
                onChange={props.onTextInputChange.bind(this, 'transcription')}
                required={props.isRequired('transcription')}
                rows={5}
                value={props.item.transcription || ''}
              />
            </Section>
          </Grid.Column>
        </Grid>
      </SimpleEditPage.Tab>
    </SimpleEditPage>
  );
};

export default useEditPage(withRouter(withMenuBar(withSingleImage(Document))), {
  getArtworkId: (item) => item.artwork_id,
  onLoad: (id) => DocumentsService.fetchOne(id).then(({ data }) => data.document),
  onSave: (doc) => DocumentsService.save(doc)
});
