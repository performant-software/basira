// @flow

import { FacetSlider, FacetToggle, LinkButton } from '@performant-software/semantic-components';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useRange,
  useRefinementList,
  useToggleRefinement
} from 'react-instantsearch-hooks-web';
import { Header, Segment } from 'semantic-ui-react';
import _ from 'underscore';
import SearchFacet from './SearchFacet';
import useFacetLabels from '../hooks/FacetLabels';
import './SearchFacets.css';

const MAX_LIMIT = 100;
const MAX_SHOW_MORE_LIMIT = 1000;

const SearchFacets = () => {
  const { getLabel } = useFacetLabels();
  const { t } = useTranslation();

  const refs = useRef([]);

  /**
   * Returns a list of the facet ref objects.
   *
   * @returns {*|*[]}
   */
  const getFacetRefs = () => {
    const { current: instances } = refs;
    return _.compact(instances) || [];
  };

  /**
   * Collapses all of the facets.
   *
   * @type {(function(): void)|*}
   */
  const onCollapse = useCallback(() => {
    _.each(getFacetRefs(), (instance) => {
      instance.collapse();
    });
  }, []);

  /**
   * Expands all of the facets.
   *
   * @type {(function(): void)|*}
   */
  const onExpand = useCallback(() => {
    _.each(getFacetRefs(), (instance) => {
      instance.expand();
    });
  }, []);

  /**
   * Sets the element into the "refs" object.
   *
   * @type {function(*): number}
   */
  const setRef = useCallback((element) => refs.current.push(element), [refs]);

  return (
    <Segment
      className='search-facets'
      padded
      raised
    >
      <LinkButton
        content={t('SearchFacets.buttons.expand')}
        onClick={onExpand}
      />
      <LinkButton
        content={t('SearchFacets.buttons.collapse')}
        onClick={onCollapse}
      />
      <Header
        as='h3'
        content={t('Search.facets.headers.artwork')}
      />
      <FacetSlider
        attribute='artwork.date_range_facet'
        defaultActive={false}
        editable
        ref={setRef}
        title={getLabel('artwork.date_range_facet')}
        useRangeSlider={useRange}
      />
      <SearchFacet
        attribute='artwork.object_work_type_facet'
        defaultActive={false}
        group='Object/Work Type'
        object='Artwork'
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.object_work_type_facet')}
        toggleable
      />
      <SearchFacet
        attribute='artwork.materials_facet'
        defaultActive={false}
        group='Material'
        object='Artwork'
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.materials_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='artwork.techniques_facet'
        defaultActive={false}
        group='Technique'
        object='Artwork'
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.techniques_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='artwork.creators.display_name_facet'
        defaultActive={false}
        limit={5}
        ref={setRef}
        searchable
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        sortBy={['name']}
        title={getLabel('artwork.creators.display_name_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='artwork.creators.nationality_facet'
        defaultActive={false}
        group='Nationality'
        object='Person'
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.creators.nationality_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='artwork.locations.name_facet'
        defaultActive={false}
        limit={5}
        ref={setRef}
        searchable
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        sortBy={['name']}
        title={getLabel('artwork.locations.name_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='artwork.locations.country_facet'
        defaultActive={false}
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.locations.country_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='artwork.locations.state_facet'
        defaultActive={false}
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        sortBy={['name']}
        title={getLabel('artwork.locations.state_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='artwork.locations.city_facet'
        defaultActive={false}
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.locations.city_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <FacetSlider
        attribute='artwork.documents_count_facet'
        defaultActive={false}
        editable
        ref={setRef}
        title={getLabel('artwork.documents_count_facet')}
        useRangeSlider={useRange}
      />
      <Header
        as='h3'
        content={t('Search.facets.headers.visualContext')}
      />
      <SearchFacet
        attribute='visual_context.general_subject_facet'
        defaultActive={false}
        group='General Subject/Genre'
        object='Visual Context'
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('visual_context.general_subject_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='visual_context.subject_cultural_context_facet'
        defaultActive={false}
        group='Subject Cultural Context'
        object='Visual Context'
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('visual_context.subject_cultural_context_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='visual_context.specific_subject_facet'
        defaultActive={false}
        group='Specific Subject/Iconography'
        object='Visual Context'
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('visual_context.specific_subject_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <Header
        as='h3'
        content={t('Search.facets.headers.documentDetails')}
      />
      <SearchFacet
        attribute='document_format_facet'
        defaultActive={false}
        group='Document Format'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('document_format_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='document_type_facet'
        defaultActive={false}
        group='Document Type'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('document_type_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='orientation_facet'
        defaultActive={false}
        group='Orientation (spine)'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('orientation_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='size_facet'
        defaultActive={false}
        group='Size'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('size_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='aperture_facet'
        defaultActive={false}
        group='Aperture'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('aperture_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <Header
        as='h3'
        content={t('Search.facets.headers.externalFeatures')}
      />
      <SearchFacet
        attribute='binding_type_facet'
        defaultActive={false}
        group='Binding Type'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('binding_type_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='binding_color_facet'
        defaultActive={false}
        group='Color'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('binding_color_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <FacetSlider
        attribute='number_sewing_supports_facet'
        defaultActive={false}
        ref={setRef}
        title={getLabel('number_sewing_supports_facet')}
        useRangeSlider={useRange}
      />
      <SearchFacet
        attribute='spine_features_facet'
        defaultActive={false}
        group='Spine Features'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('spine_features_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='furniture_facet'
        defaultActive={false}
        group='Furniture'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('furniture_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='fastenings_facet'
        defaultActive={false}
        group='Fastenings'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('fastenings_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <FacetSlider
        attribute='number_fastenings_facet'
        defaultActive={false}
        ref={setRef}
        title={getLabel('number_fastenings_facet')}
        useRangeSlider={useRange}
      />
      <SearchFacet
        attribute='location_fastenings_facet'
        defaultActive={false}
        group='Location of Fastenings'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('location_fastenings_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='inscriptions_on_binding_facet'
        defaultActive={false}
        ref={setRef}
        title={getLabel('inscriptions_on_binding_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <SearchFacet
        attribute='binding_ornamentation_facet'
        defaultActive={false}
        group='Binding Ornamentation'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('binding_ornamentation_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='binding_iconography_facet'
        defaultActive={false}
        group='Iconography'
        ref={setRef}
        object='Document'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('binding_iconography_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='endband_present_facet'
        defaultActive={false}
        ref={setRef}
        title={getLabel('endband_present_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <SearchFacet
        attribute='endband_colors_facet'
        defaultActive={false}
        group='Color'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('endband_colors_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='endband_style_facet'
        defaultActive={false}
        group='Endband Style'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('endband_style_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='binding_relationship_facet'
        defaultActive={false}
        group='Binding Relationship to Text Block'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('binding_relationship_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='decorated_fore_edges_facet'
        defaultActive={false}
        group='Decorated Fore-Edges'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('decorated_fore_edges_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='uncut_fore_edges_facet'
        defaultActive={false}
        ref={setRef}
        title={getLabel('uncut_fore_edges_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <SearchFacet
        attribute='fore_edges_color_facet'
        defaultActive={false}
        group='Color'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('fore_edges_color_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <FacetSlider
        attribute='bookmarks_registers_facet'
        defaultActive={false}
        ref={setRef}
        title={getLabel('bookmarks_registers_facet')}
        useRangeSlider={useRange}
      />
      <SearchFacet
        attribute='bookmark_register_color_facet'
        defaultActive={false}
        group='Color'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('bookmark_register_color_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='bookmark_style_facet'
        defaultActive={false}
        group='Bookmark/Register Style'
        ref={setRef}
        object='Document'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('bookmark_style_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <Header
        as='h3'
        content={t('Search.facets.headers.internalFeatures')}
      />
      <SearchFacet
        attribute='text_technology_facet'
        defaultActive={false}
        group='Text Technology'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('text_technology_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <FacetSlider
        attribute='text_columns_facet'
        defaultActive={false}
        limit={MAX_LIMIT}
        ref={setRef}
        title={getLabel('text_columns_facet')}
        useRangeSlider={useRange}
      />
      <SearchFacet
        attribute='page_contents_facet'
        defaultActive={false}
        group='Page Contents'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('page_contents_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='ruling_facet'
        defaultActive={false}
        ref={setRef}
        title={getLabel('ruling_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <SearchFacet
        attribute='ruling_color_facet'
        defaultActive={false}
        group='Color'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('ruling_color_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='rubrication_facet'
        defaultActive={false}
        ref={setRef}
        title={getLabel('rubrication_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <SearchFacet
        attribute='rubrication_color_facet'
        defaultActive={false}
        group='Color'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('rubrication_color_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='legibility_facet'
        defaultActive={false}
        group='Legibility'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('legibility_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='script_facet'
        defaultActive={false}
        group='Script'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('script_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='script_type_facet'
        defaultActive={false}
        group='Script Type'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('script_type_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='simulated_script_facet'
        defaultActive={false}
        group='Simulated Script'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('simulated_script_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='language_facet'
        defaultActive={false}
        group='Language'
        ref={setRef}
        object='Document'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('language_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='illumination_type_facet'
        defaultActive={false}
        group='Type of Illumination'
        limit={MAX_LIMIT}
        object='Document'
        ref={setRef}
        title={getLabel('illumination_type_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='illumination_iconography_facet'
        defaultActive={false}
        group='Iconography'
        ref={setRef}
        object='Document'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('illumination_iconography_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <Header
        as='h3'
        content={t('Search.facets.headers.documentActions')}
      />
      <SearchFacet
        attribute='actions.verb_facet'
        defaultActive={false}
        group='Action'
        ref={setRef}
        object='Document'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('actions.verb_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='actions.entity_facet'
        defaultActive={false}
        group='Entity'
        object='Action'
        ref={setRef}
        searchable
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('actions.entity_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='actions.entity_descriptors_facet'
        defaultActive={false}
        group='Characteristic'
        object='Action'
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('actions.entity_descriptors_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
      <SearchFacet
        attribute='actions.body_descriptors_facet'
        defaultActive={false}
        group='Body'
        object='Action'
        ref={setRef}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('actions.body_descriptors_facet')}
        toggleable
        useRefinementList={useRefinementList}
      />
    </Segment>
  );
};

export default SearchFacets;
