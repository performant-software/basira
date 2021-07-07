// @flow

import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown, Form, Grid } from 'semantic-ui-react';
import DocumentsService from '../../services/Documents';
import ItemLabel from '../../components/ItemLabel';
import LocationOfFastenings from '../../resources/LocationOfFastenings.json';
import RecordHeader from '../../components/RecordHeader';
import Section from '../../components/Section';
import SimpleEditPage from '../../components/SimpleEditPage';
import ValueListDropdown from '../../components/ValueListDropdown';
import useEditPage from './EditPage';
import withMenuBar from '../../hooks/MenuBar';
import withSingleImage from '../../hooks/Image';
import _ from 'underscore';

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

  const hasSelectedValue = (groupName) => (
    props.item?.qualifications?.some((qualification) => {
      if (qualification.value_list) {
        return (
          _.isMatch(qualification.value_list, {
            object: 'Document',
            group: groupName
          })
          && !qualification._destroy
          && qualification.value_list.human_name !== undefined
        );
      }
      return (
        _.isMatch(qualification, {
          value_list_object: 'Document',
          value_list_group: groupName
        })
        && qualification.human_name !== undefined
      );
    })
  );

  const meetsCriteria = (groupName, humanName) => (
    props.item?.qualifications?.some((qualification) => {
      if (qualification.value_list) {
        return (
          _.isMatch(qualification.value_list, {
            human_name: humanName,
            object: 'Document',
            group: groupName
          })
          && !qualification._destroy
        );
      }
      return (
        _.isMatch(qualification, {
          human_name: humanName,
          value_list_object: 'Document',
          value_list_group: groupName
        })
      );
    })
  );

  const showInternalFeatures = () => {
    const documentFormatQual = _.findWhere(props.item.qualifications, {
      value_list_object: 'Document',
      value_list_group: 'Document Format'
    });
    const apertureQuals = _.where(props.item.qualifications, {
      value_list_object: 'Document',
      value_list_group: 'Aperture'
    });
    const apertureValues = ['Partially open', 'Fully Open', 'Fluttering/Breathing'];

    if (documentFormatQual === undefined) { return false; }
    if (
      documentFormatQual?.human_name !== 'Codex/Book' || documentFormatQual?.value_list?.human_name !== 'Codex/Book'
    ) { return true; }
    if (
      documentFormatQual?.human_name === 'Codex/Book' || documentFormatQual?.value_list?.human_name === 'Codex/Book'
    ) {
      if (
        apertureQuals.some((quals) => (
          apertureValues.includes(quals?.human_name) || apertureValues.includes(quals?.value_list.human_name)
        ))
      ) { return true; }
      return false;
    }

    return false;
  };

  const zeroToTenRangeOptionsList = [...(_.range(0, 10)), '10+'].map((el) => (
    {
      key: el,
      value: el,
      text: el
    }
  ));

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
        <Grid
          columns={2}
        >
          <Grid.Column>
            <Section
              title={props.t('Document.sections.details')}
            >
              <Form.Input
                error={props.isError('name')}
                label={props.t('Document.labels.name')}
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
              { meetsCriteria('Document Format', 'Codex/Book') && (
                <ValueListDropdown
                  {...props}
                  group='Orientation'
                  label={props.t('Document.labels.orientation')}
                  multiple
                  object='Document'
                />
              )}
              <ValueListDropdown
                {...props}
                group='Size'
                label={props.t('Document.labels.size')}
                object='Document'
              />
              { meetsCriteria('Document Format', 'Codex/Book') && (
                <ValueListDropdown
                  {...props}
                  group='Aperture'
                  label={props.t('Document.labels.aperture')}
                  multiple
                  object='Document'
                />
              )}
            </Section>
          </Grid.Column>
        </Grid>
      </SimpleEditPage.Tab>
      { meetsCriteria('Document Format', 'Codex/Book') && (
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
                  group='Color'
                  label={props.t('Document.labels.bindingColor')}
                  multiple
                  object='Document'
                />
                <Form.Checkbox
                  checked={props.item.sewing_supports_visible}
                  error={props.isError('sewing_supports_visible')}
                  label={props.t('Document.labels.sewingSupportsVisible')}
                  onChange={props.onCheckboxInputChange.bind(this, 'sewing_supports_visible')}
                  required={props.isRequired('sewing_supports_visible')}
                  toggle
                />
                { props.item.sewing_supports_visible && (
                  <Form.Input
                    error={props.isError('number_sewing_supports')}
                    label={props.t('Document.labels.numberSewingSupports')}
                    required={props.isRequired('number_sewing_supports')}
                  >
                    <Dropdown
                      onChange={props.onTextInputChange.bind(this, 'number_sewing_supports')}
                      options={zeroToTenRangeOptionsList}
                      selection
                      value={props.item.number_sewing_supports || ''}
                    />
                  </Form.Input>
                )}
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
                { hasSelectedValue('Fastenings') && (
                  <Form.Input
                    error={props.isError('number_fastenings')}
                    label={props.t('Document.labels.numberFastenings')}
                    required={props.isRequired('number_fastenings')}
                  >
                    <Dropdown
                      onChange={props.onTextInputChange.bind(this, 'number_fastenings')}
                      options={zeroToTenRangeOptionsList}
                      selection
                      value={props.item.number_fastenings || ''}
                    />
                  </Form.Input>
                )}
                <Form.Dropdown
                  error={props.isError('location_of_fastenings')}
                  clearable
                  label={props.t('Document.labels.locationOfFastenings')}
                  multiple
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
                { props.item.inscriptions_on_binding && (
                  <Form.Input
                    error={props.isError('inscription_text')}
                    label={props.t('Document.labels.inscriptionText')}
                    onChange={props.onTextInputChange.bind(this, 'inscription_text')}
                    required={props.isRequired('inscription_text')}
                    value={props.item.inscription_text || ''}
                  />
                )}
                <ValueListDropdown
                  {...props}
                  group='Binding Ornamentation'
                  label={props.t('Document.labels.bindingOrnamentation')}
                  multiple
                  object='Document'
                />
                <ValueListDropdown
                  {...props}
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
                { props.item.endband_present && (
                  <>
                    <ValueListDropdown
                      {...props}
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
                  </>
                )}
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
                  group='Color'
                  label={props.t('Document.labels.colorOfForeEdges')}
                  multiple
                  object='Document'
                />
                { meetsCriteria('Decorated Fore-Edges', 'Titled / Lettered') && (
                  <Form.Input
                    error={props.isError('fore_edge_text')}
                    label={props.t('Document.labels.foreEdgeText')}
                    onChange={props.onTextInputChange.bind(this, 'fore_edge_text')}
                    required={props.isRequired('fore_edge_text')}
                    value={props.item.fore_edge_text || ''}
                  />
                )}
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
                    onChange={props.onTextInputChange.bind(this, 'bookmarks_registers')}
                    options={zeroToTenRangeOptionsList}
                    selection
                    value={props.item.bookmarks_registers || ''}
                  />
                </Form.Input>
                { parseInt(props.item.bookmarks_registers, 10) > 0 && (
                  <>
                    <ValueListDropdown
                      {...props}
                      group='Color'
                      label={props.t('Document.labels.color')}
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
                  </>
                )}
              </Section>
            </Grid.Column>
          </Grid>
        </SimpleEditPage.Tab>
      )}
      { showInternalFeatures() && (
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
                    onChange={props.onTextInputChange.bind(this, 'text_columns')}
                    options={zeroToTenRangeOptionsList}
                    selection
                    value={props.item.text_columns || ''}
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
                { props.item.ruling && (
                  <ValueListDropdown
                    {...props}
                    group='Color'
                    label={props.t('Document.labels.rulingColor')}
                    multiple
                    object='Document'
                  />
                )}
                <Form.Checkbox
                  checked={props.item.rubrication}
                  error={props.isError('rubrication')}
                  label={props.t('Document.labels.rubrication')}
                  onChange={props.onCheckboxInputChange.bind(this, 'rubrication')}
                  required={props.isRequired('rubrication')}
                  toggle
                />
                { props.item.rubrication && (
                  <ValueListDropdown
                    {...props}
                    group='Color'
                    label={props.t('Document.labels.rubricationColor')}
                    multiple
                    object='Document'
                  />
                )}
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
                { meetsCriteria('Legibility', 'Yes') && (
                  <>
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
                      label={props.t('Document.labels.transcription')}
                      onChange={props.onTextInputChange.bind(this, 'transcription')}
                      required={props.isRequired('transcription')}
                      rows={5}
                      value={props.item.transcription || ''}
                    />
                  </>
                )}
                { meetsCriteria('Legibility', 'No') && (
                  <ValueListDropdown
                    {...props}
                    group='Simulated Script'
                    label={props.t('Document.labels.simulatedScript')}
                    multiple
                    object='Document'
                  />
                )}
                <ValueListDropdown
                  {...props}
                  group='Type of Illumination'
                  label={props.t('Document.labels.typeOfIllumination')}
                  multiple
                  object='Document'
                />
                { meetsCriteria('Type of Illumination', 'Figurative') && (
                  <ValueListDropdown
                    {...props}
                    group='Iconography'
                    label={props.t('Document.labels.illumunationIconography')}
                    multiple
                    object='Document'
                  />
                )}
              </Section>
            </Grid.Column>
          </Grid>
        </SimpleEditPage.Tab>
      )}
    </SimpleEditPage>
  );
};

export default useEditPage(withRouter(withMenuBar(withSingleImage(Document))), {
  getArtworkId: (item) => item.artwork_id,
  onLoad: (id) => DocumentsService.fetchOne(id).then(({ data }) => data.document),
  onSave: (doc) => DocumentsService.save(doc)
});
