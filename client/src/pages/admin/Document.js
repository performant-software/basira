// @flow

import React, { useEffect, useMemo } from 'react';
import { EmbeddedList, LazyImage } from '@performant-software/semantic-components';
import { withRouter } from 'react-router-dom';
import {
  Dropdown,
  Form,
  Grid,
} from 'semantic-ui-react';
import _ from 'underscore';
import ActionModal from '../../components/ActionModal';
import Action from '../../transforms/Action';
import Authorization from '../../utils/Authorization';
import DocumentsService from '../../services/Documents';
import ItemLabel from '../../components/ItemLabel';
import Qualifiables from '../../utils/Qualifiables';
import RecordHeader from '../../components/RecordHeader';
import Section from '../../components/Section';
import SimpleEditPage from '../../components/SimpleEditPage';
import ValueListDropdown from '../../components/ValueListDropdown';
import useEditPage from './EditPage';
import withMenuBar from '../../hooks/MenuBar';
import withSingleImage from '../../hooks/Image';
import './Document.css';

import type { EditPageProps } from './EditPage';
import type { ImageProps } from '../../hooks/Image';
import type { Document as DocumentType } from '../../types/Document';
import type { Translateable } from '../../types/Translateable';
import type { Routeable } from '../../types/Routeable';

type Props = EditPageProps & ImageProps & Routeable & Translateable & {
  item: DocumentType
};

const Tabs = {
  details: 'details',
  external: 'external',
  internal: 'internal',
  actions: 'actions'
};

const Document = (props: Props) => {
  /**
   * Sets the visual_context_id from the state.
   */
  useEffect(() => {
    if (props.location.state) {
      props.onSetState({
        artwork_id: props.location.state.artwork_id || props.item.artwork_id,
        visual_context_id: props.location.state.visual_context_id
      });
    }
  }, []);

  const zeroToTenRangeOptionsList = useMemo(() => [
    ..._.range(0, 10).map((el) => ({ key: el, value: el, text: el })),
    {
      key: 10,
      value: 10,
      text: '10+'
    }
  ], []);

  return (
    <SimpleEditPage
      artworkId={props.item.artwork_id}
      className='document'
      errors={props.errors}
      loading={props.loading}
      onSave={props.onSave}
      onTabClick={props.onTabClick}
      saving={props.saving}
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
          id={props.item.id}
          image={props.image && props.image.file_url}
          includeNotesButton={false}
          includePublishButton={false}
          onFileDelete={props.onDeleteImage}
          onFileEdit={props.onEditImage}
          onFileUpload={props.onSaveImage}
          preview={props.image && props.image.thumbnail_url}
          url={`/admin/documents/${props.item.id}`}
        />
      </SimpleEditPage.Header>
      <SimpleEditPage.Tab
        key={Tabs.details}
        name={props.t('Common.tabs.details')}
      >
        <Grid
          columns={2}
        >
          <Grid.Column>
            <Section
              title={props.t('Document.sections.details')}
            >
              <Form.Input
                error={props.isError('name')}
                label={props.t('Common.labels.name')}
                onChange={props.onTextInputChange.bind(this, 'name')}
                required={props.isRequired('name')}
                value={props.item.name || ''}
              />
              <ValueListDropdown
                {...props}
                group='Document Format'
                label={props.t('Document.labels.documentFormat')}
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Document Type'
                label={props.t('Document.labels.documentType')}
                object='Document'
                multiple
              />
              <Form.TextArea
                error={props.isError('notes')}
                label={props.t('Document.labels.notes')}
                onChange={props.onTextInputChange.bind(this, 'notes')}
                required={props.isRequired('notes')}
                value={props.item.notes || ''}
              />
            </Section>
          </Grid.Column>
          <Grid.Column>
            <Section
              title={props.t('Document.sections.positionScaleAttitude')}
            >
              <ValueListDropdown
                {...props}
                group='Orientation (spine)'
                label={props.t('Document.labels.orientation')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Size'
                label={props.t('Document.labels.size')}
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Aperture'
                label={props.t('Document.labels.aperture')}
                multiple
                object='Document'
              />
            </Section>
          </Grid.Column>
        </Grid>
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
              <ValueListDropdown
                {...props}
                group='Binding Type'
                label={props.t('Document.labels.bindingType')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                formField='binding_color'
                group='Color'
                label={props.t('Document.labels.bindingColor')}
                multiple
                object='Document'
              />
              <Form.Input
                error={props.isError('number_sewing_supports')}
                label={props.t('Document.labels.numberSewingSupports')}
                required={props.isRequired('number_sewing_supports')}
              >
                <Dropdown
                  defaultValue={0}
                  fluid
                  onChange={props.onTextInputChange.bind(this, 'number_sewing_supports')}
                  options={zeroToTenRangeOptionsList}
                  selection
                  value={props.item.number_sewing_supports}
                />
              </Form.Input>
              <ValueListDropdown
                {...props}
                group='Spine Features'
                label={props.t('Document.labels.spineFeatures')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Furniture'
                label={props.t('Document.labels.furniture')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Fastenings'
                label={props.t('Document.labels.fastenings')}
                multiple
                object='Document'
              />
              <Form.Input
                error={props.isError('number_fastenings')}
                label={props.t('Document.labels.numberFastenings')}
                required={props.isRequired('number_fastenings')}
              >
                <Dropdown
                  defaultValue={0}
                  fluid
                  onChange={props.onTextInputChange.bind(this, 'number_fastenings')}
                  options={zeroToTenRangeOptionsList}
                  selection
                  value={props.item.number_fastenings}
                />
              </Form.Input>
              <ValueListDropdown
                {...props}
                group='Location of Fastenings'
                label={props.t('Document.labels.locationsOfFastenings')}
                multiple
                object='Document'
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
              <ValueListDropdown
                {...props}
                group='Binding Ornamentation'
                label={props.t('Document.labels.bindingOrnamentation')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                formField='binding_iconography'
                group='Iconography'
                label={props.t('Document.labels.bindingIconography')}
                multiple
                object='Document'
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
              <ValueListDropdown
                {...props}
                formField='endband_colors'
                group='Color'
                label={props.t('Document.labels.endbandColors')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Endband Style'
                label={props.t('Document.labels.endbandStyle')}
                multiple
                object='Document'
              />
            </Section>
            <Section
              title={props.t('Document.sections.foreEdges')}
            >
              <ValueListDropdown
                {...props}
                group='Binding Relationship to Text Block'
                label={props.t('Document.labels.bindingRelationshipToTextBlock')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Decorated Fore-Edges'
                label={props.t('Document.labels.decoratedForeEdges')}
                multiple
                object='Document'
              />
              <Form.Checkbox
                checked={props.item.uncut_fore_edges}
                error={props.isError('uncut_fore_edges')}
                label={props.t('Document.labels.uncutForeEdges')}
                onChange={props.onCheckboxInputChange.bind(this, 'uncut_fore_edges')}
                required={props.isRequired('uncut_fore_edges')}
                toggle
              />
              <ValueListDropdown
                {...props}
                formField='fore_edges_color'
                group='Color'
                label={props.t('Document.labels.colorOfForeEdges')}
                multiple
                object='Document'
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
                required={props.isRequired('bookmarks_registers')}
              >
                <Dropdown
                  defaultValue={0}
                  fluid
                  onChange={props.onTextInputChange.bind(this, 'bookmarks_registers')}
                  options={zeroToTenRangeOptionsList}
                  selection
                  value={props.item.bookmarks_registers}
                />
              </Form.Input>
              <ValueListDropdown
                {...props}
                formField='bookmark_register_color'
                group='Color'
                label={props.t('Document.labels.bookmarksRegisterColor')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Bookmark/Register Style'
                label={props.t('Document.labels.bookmarkRegisterStyle')}
                multiple
                object='Document'
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
              <ValueListDropdown
                {...props}
                group='Text Technology'
                label={props.t('Document.labels.textTechnology')}
                multiple
                object='Document'
              />

              <Form.Input
                error={props.isError('text_columns')}
                label={props.t('Document.labels.textColumns')}
                required={props.isRequired('text_columns')}
              >
                <Dropdown
                  defaultValue={0}
                  fluid
                  onChange={props.onTextInputChange.bind(this, 'text_columns')}
                  options={zeroToTenRangeOptionsList}
                  selection
                  value={props.item.text_columns}
                />
              </Form.Input>
              <ValueListDropdown
                {...props}
                group='Page Contents'
                label={props.t('Document.labels.pageContents')}
                multiple
                object='Document'
              />
              <Form.Checkbox
                checked={props.item.ruling}
                error={props.isError('ruling')}
                label={props.t('Document.labels.ruling')}
                onChange={props.onCheckboxInputChange.bind(this, 'ruling')}
                required={props.isRequired('ruling')}
                toggle
              />
              <ValueListDropdown
                {...props}
                formField='ruling_color'
                group='Color'
                label={props.t('Document.labels.rulingColor')}
                multiple
                object='Document'
              />
              <Form.Checkbox
                checked={props.item.rubrication}
                error={props.isError('rubrication')}
                label={props.t('Document.labels.rubrication')}
                onChange={props.onCheckboxInputChange.bind(this, 'rubrication')}
                required={props.isRequired('rubrication')}
                toggle
              />
              <ValueListDropdown
                {...props}
                formField='rubrication_color'
                group='Color'
                label={props.t('Document.labels.rubricationColor')}
                multiple
                object='Document'
              />
            </Section>
          </Grid.Column>
          <Grid.Column>
            <Section
              title={props.t('Document.sections.text')}
            >
              <ValueListDropdown
                {...props}
                group='Legibility'
                label={props.t('Document.labels.legibility')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Script'
                label={props.t('Document.labels.script')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Script Type'
                label={props.t('Document.labels.scriptType')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Simulated Script'
                label={props.t('Document.labels.simulatedScript')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                group='Language'
                label={props.t('Document.labels.language')}
                multiple
                object='Document'
              />
              <Form.Input
                error={props.isError('identity')}
                label={props.t('Document.labels.identity')}
                onChange={props.onTextInputChange.bind(this, 'identity')}
                required={props.isRequired('identity')}
                value={props.item.identity || ''}
              />
              <Form.TextArea
                error={props.isError('transcription')}
                label={props.t('Document.labels.transcriptionDiplomatic')}
                onChange={props.onTextInputChange.bind(this, 'transcription')}
                required={props.isRequired('transcription')}
                rows={5}
                value={props.item.transcription || ''}
              />
              <Form.TextArea
                error={props.isError('transcription_expanded')}
                label={props.t('Document.labels.transcriptionExpanded')}
                onChange={props.onTextInputChange.bind(this, 'transcription_expanded')}
                required={props.isRequired('transcription_expanded')}
                rows={5}
                value={props.item.transcription_expanded || ''}
              />
              <Form.TextArea
                error={props.isError('transcription_translation')}
                label={props.t('Document.labels.transcriptionTranslation')}
                onChange={props.onTextInputChange.bind(this, 'transcription_translation')}
                required={props.isRequired('transcription_translation')}
                rows={5}
                value={props.item.transcription_translation || ''}
              />
              <ValueListDropdown
                {...props}
                group='Type of Illumination'
                label={props.t('Document.labels.typeOfIllumination')}
                multiple
                object='Document'
              />
              <ValueListDropdown
                {...props}
                formField='illumination_iconography'
                group='Iconography'
                label={props.t('Document.labels.illuminationIconography')}
                multiple
                object='Document'
              />
            </Section>
          </Grid.Column>
        </Grid>
      </SimpleEditPage.Tab>
      <SimpleEditPage.Tab
        key={Tabs.actions}
        name={props.t('Document.tabs.actions')}
      >
        { props.item.visual_context_image && props.item.visual_context_image.file_url && (
          <div
            className='vc-image-container'
          >
            <LazyImage
              preview={props.item.visual_context_image.thumbnail_url}
              src={props.item.visual_context_image.file_url}
            />
          </div>
        )}
        <EmbeddedList
          actions={[{
            name: 'edit'
          }, {
            name: 'copy'
          }, {
            name: 'delete'
          }]}
          columns={[{
            name: 'book',
            label: '',
            resolve: () => props.t('Document.actions.document'),
            sortable: false
          }, {
            name: 'verb',
            label: props.t('Document.actions.columns.verb'),
            resolve: (action) => Qualifiables.getValueListValue(action, 'Document', 'Action')
          }, {
            name: 'entity',
            label: props.t('Document.actions.columns.entity'),
            resolve: (action) => Qualifiables.getValueListValue(action, 'Action', 'Entity')
          }]}
          items={props.item.actions}
          modal={{
            component: ActionModal
          }}
          onCopy={Action.toCopy.bind(this)}
          onDelete={props.onDeleteChildAssociation.bind(this, 'actions')}
          onSave={props.onSaveChildAssociation.bind(this, 'actions')}
        />
      </SimpleEditPage.Tab>
    </SimpleEditPage>
  );
};

export default useEditPage(withRouter(withMenuBar(withSingleImage(Document))), {
  getArtworkId: (item) => item.artwork_id,
  onLoad: (id) => DocumentsService.fetchOne(id).then(({ data }) => data.document),
  onSave: (doc) => DocumentsService.save(doc).then(({ data }) => data.document),
  resolveValidationError: (e) => Authorization.resolveUpdateError(e)
});
