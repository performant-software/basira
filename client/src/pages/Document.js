// @flow

import React, { useCallback } from 'react';
import { BooleanIcon } from '@performant-software/semantic-components';
import { useTranslation } from 'react-i18next';
import { Grid } from 'semantic-ui-react';
import _ from 'underscore';
import AttributesGrid from '../components/AttributesGrid';
import DocumentActions from '../components/DocumentActions';
import DocumentsService from '../services/Documents';
import { getDateTimeView } from '../utils/Date';
import RecordPage from '../components/RecordPage';
import useCurrentRecord from '../hooks/CurrentRecord';

const Document = () => {
  /**
   * Callback for loading the current document.
   *
   * @type {function(*): Promise<AxiosResponse<T>>|Promise<AxiosResponse<T>|unknown>|Promise<unknown>|*}
   */
  const onLoad = useCallback((id) => (
    DocumentsService
      .fetchOne(id)
      .then(({ data }) => data.document)
  ), []);

  const { item, loading } = useCurrentRecord(onLoad);
  const { t } = useTranslation();

  return (
    <RecordPage
      artworkId={item?.artwork_id}
      className='document'
      loading={loading}
      renderTitle={() => item.name}
    >
      <RecordPage.Section>
        <RecordPage.Header
          image={item?.primary_attachment}
        >
          <AttributesGrid
            attributes={[{
              name: 'id',
              label: t('Common.labels.id')
            }, {
              name: 'name',
              label: t('Document.labels.name')
            }, {
              name: 'created_at',
              label: t('Common.labels.created'),
              renderValue: () => getDateTimeView(item.created_at)
            }, {
              name: 'updated_at',
              label: t('Common.labels.updated'),
              renderValue: () => getDateTimeView(item.updated_at)
            }, {
              name: 'document_type',
              label: t('Document.labels.documentType'),
              qualification: {
                object: 'Document',
                group: 'Document Type'
              }
            }, {
              name: 'document_format',
              label: t('Document.labels.documentFormat'),
              qualification: {
                object: 'Document',
                group: 'Document Format'
              }
            }, {
              name: 'orientation',
              label: t('Document.labels.orientation'),
              qualification: {
                object: 'Document',
                group: 'Orientation (spine)'
              }
            }, {
              name: 'size',
              label: t('Document.labels.size'),
              qualification: {
                object: 'Document',
                group: 'Size'
              }
            }, {
              name: 'aperture',
              label: t('Document.labels.aperture'),
              qualification: {
                object: 'Document',
                group: 'Aperture'
              }
            }, {
              name: 'notes',
              label: t('Document.labels.notes')
            }]}
            item={item}
            title={t('Common.labels.details')}
          />
        </RecordPage.Header>
      </RecordPage.Section>
      { !_.isEmpty(item?.actions) && (
        <RecordPage.Section
          title={t('Document.tabs.actions')}
        >
          <DocumentActions
            items={item.actions}
          />
        </RecordPage.Section>
      )}
      <RecordPage.Section
        title={t('Document.tabs.external')}
      >
        <Grid
          columns={2}
        >
          <Grid.Column>
            <AttributesGrid
              attributes={[{
                name: 'binding_type',
                label: t('Document.labels.bindingType'),
                qualification: {
                  object: 'Document',
                  group: 'Binding Type'
                }
              }, {
                name: 'binding_color',
                label: t('Document.labels.bindingColor'),
                qualification: {
                  object: 'Document',
                  group: 'Binding Color'
                }
              }, {
                name: 'number_sewing_supports',
                label: t('Document.labels.numberSewingSupports')
              }, {
                name: 'spine_features',
                label: t('Document.labels.spineFeatures'),
                qualification: {
                  object: 'Document',
                  group: 'Spine Features'
                }
              }, {
                name: 'furniture',
                label: t('Document.labels.furniture'),
                qualification: {
                  object: 'Document',
                  group: 'Furniture'
                }
              }, {
                name: 'fastenings',
                label: t('Document.labels.fastenings'),
                qualification: {
                  object: 'Document',
                  group: 'Fastenings'
                }
              }, {
                name: 'number_fastenings',
                label: t('Document.labels.numberFastenings')
              }, {
                name: 'location_fastenings',
                label: t('Document.labels.locationsOfFastenings'),
                qualification: {
                  object: 'Document',
                  group: 'Location of Fastenings'
                }
              }, {
                name: 'inscriptions_on_binding',
                label: t('Document.labels.inscriptionsOnBinding'),
                renderValue: () => <BooleanIcon value={item.inscriptions_on_binding} />
              }, {
                name: 'inscription_text',
                label: t('Document.labels.inscriptionText')
              }, {
                name: 'binding_ornamentation',
                label: t('Document.labels.bindingOrnamentation'),
                qualification: {
                  object: 'Document',
                  group: 'Binding Ornamentation'
                }
              }, {
                name: 'binding_iconography',
                label: t('Document.labels.bindingIconography'),
                qualification: {
                  object: 'Document',
                  group: 'Iconography',
                  formField: 'binding_iconography'
                }
              }]}
              item={item}
              title={t('Document.sections.binding')}
            />
          </Grid.Column>
          <Grid.Column>
            <AttributesGrid
              attributes={[{
                name: 'endband_present',
                label: t('Document.labels.endbandPresent'),
                renderValue: () => <BooleanIcon value={item.endband_present} />
              }, {
                name: 'endband_colors',
                label: t('Document.labels.endbandColors'),
                qualification: {
                  object: 'Document',
                  group: 'Color',
                  formField: 'endband_colors'
                }
              }, {
                name: 'endband_style',
                label: t('Document.labels.endbandStyle'),
                qualification: {
                  object: 'Document',
                  group: 'Endband Style'
                }
              }]}
              item={item}
              title={t('Document.sections.endband')}
            />
          </Grid.Column>
          <Grid.Column>
            <AttributesGrid
              attributes={[{
                name: 'binding_relationship_text_block',
                label: t('Document.labels.bindingRelationshipToTextBlock'),
                qualification: {
                  object: 'Document',
                  group: 'Binding Relationship to Text Block'
                }
              }, {
                name: 'decorated_fore_edges',
                label: t('Document.labels.decoratedForeEdges'),
                qualification: {
                  object: 'Document',
                  group: 'Decorated Fore-Edges'
                }
              }, {
                name: 'uncut_fore_edges',
                label: t('Document.labels.uncutForeEdges'),
                renderValue: () => <BooleanIcon value={item.uncut_fore_edges} />
              }, {
                name: 'fore_edges_color',
                label: t('Document.labels.colorOfForeEdges'),
                qualification: {
                  object: 'Document',
                  group: 'Color',
                  formField: 'fore_edges_color'
                }
              }, {
                name: 'fore_edge_text',
                label: t('Document.labels.foreEdgeText')
              }]}
              item={item}
              title={t('Document.sections.foreEdges')}
            />
          </Grid.Column>
          <Grid.Column>
            <AttributesGrid
              attributes={[{
                name: 'bookmarks_registers',
                label: t('Document.labels.bookmarksRegisters')
              }, {
                name: 'bookmark_register_color',
                label: t('Document.labels.bookmarksRegisterColor'),
                qualification: {
                  object: 'Document',
                  group: 'Color',
                  formField: 'bookmark_register_color'
                }
              }, {
                name: 'bookmark_register_style',
                label: t('Document.labels.bookmarkRegisterStyle'),
                qualification: {
                  object: 'Document',
                  group: 'Bookmark/Register Style'
                }
              }]}
              item={item}
              title={t('Document.sections.bookmarks')}
            />
          </Grid.Column>
        </Grid>
      </RecordPage.Section>
      <RecordPage.Section
        title={t('Document.tabs.internal')}
      >
        <Grid
          columns={2}
        >
          <Grid.Column>
            <AttributesGrid
              attributes={[{
                name: 'text_technology',
                label: t('Document.labels.textTechnology'),
                qualification: {
                  object: 'Document',
                  group: 'Text Technology'
                }
              }, {
                name: 'text_columns',
                label: t('Document.labels.textColumns')
              }, {
                name: 'page_contents',
                label: t('Document.labels.pageContents'),
                qualification: {
                  object: 'Document',
                  group: 'Page Contents'
                }
              }, {
                name: 'ruling',
                label: t('Document.labels.ruling'),
                renderValue: () => <BooleanIcon value={item.ruling} />
              }, {
                name: 'ruling_color',
                label: t('Document.labels.rulingColor'),
                qualification: {
                  object: 'Document',
                  group: 'Color',
                  formField: 'ruling_color'
                }
              }, {
                name: 'rubrication',
                label: t('Document.labels.rubrication'),
                renderValue: () => <BooleanIcon value={item.rubrication} />
              }, {
                name: 'rubrication_color',
                label: t('Document.labels.rubricationColor'),
                qualification: {
                  object: 'Document',
                  group: 'Color',
                  formField: 'rubrication_color'
                }
              }]}
              item={item}
              title={t('Document.sections.layout')}
            />
          </Grid.Column>
          <Grid.Column>
            <AttributesGrid
              attributes={[{
                name: 'legibility',
                label: t('Document.labels.legibility'),
                qualification: {
                  object: 'Document',
                  group: 'Legibility'
                }
              }, {
                name: 'script',
                label: t('Document.labels.script'),
                qualification: {
                  object: 'Document',
                  group: 'Script'
                }
              }, {
                name: 'script_type',
                label: t('Document.labels.scriptType'),
                qualification: {
                  object: 'Document',
                  group: 'Script Type'
                }
              }, {
                name: 'simulated_script',
                label: t('Document.labels.simulatedScript'),
                qualification: {
                  object: 'Document',
                  group: 'Simulated Script'
                }
              }, {
                name: 'language',
                label: t('Document.labels.language'),
                qualification: {
                  object: 'Document',
                  group: 'Language'
                }
              }, {
                name: 'identity',
                label: t('Document.labels.identity')
              }, {
                name: 'transcription',
                label: t('Document.labels.transcriptionDiplomatic')
              }, {
                name: 'transcription_expanded',
                label: t('Document.labels.transcriptionExpanded')
              }, {
                name: 'transcription_translation',
                label: t('Document.labels.transcriptionTranslation')
              }, {
                name: 'type_of_illumination',
                label: t('Document.labels.typeOfIllumination'),
                qualification: {
                  object: 'Document',
                  group: 'Type of Illumination'
                }
              }, {
                name: 'illumination_iconography',
                label: t('Document.labels.illuminationIconography'),
                qualification: {
                  object: 'Document',
                  group: 'Iconography',
                  formField: 'illumination_iconography'
                }
              }]}
              item={item}
              title={t('Document.sections.text')}
            />
          </Grid.Column>
        </Grid>
      </RecordPage.Section>
    </RecordPage>
  );
};

export default Document;
