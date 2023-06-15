// @flow

import { FacetList, FacetSlider, FacetToggle } from '@performant-software/semantic-components';
import React from 'react';
import {
  useHits,
  useRange,
  useRefinementList,
  useToggleRefinement
} from 'react-instantsearch-hooks-web';
import { Segment } from 'semantic-ui-react';
import _ from 'underscore';
import useFacetLabels from '../hooks/FacetLabels';

const MAX_LIMIT = 100;
const MAX_SHOW_MORE_LIMIT = 1000;

const SearchFacets = (props: any) => {
  const { getLabel } = useFacetLabels();
  const { hits } = useHits(props);

  if (_.isEmpty(hits)) {
    return null;
  }

  return (
    <Segment
      padded
      raised
    >
      <FacetSlider
        attribute='artwork.date_range_facet'
        title={getLabel('artwork.date_range_facet')}
        useRangeSlider={useRange}
      />
      <FacetList
        attribute='artwork.object_work_type_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.object_work_type_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='artwork.materials_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.materials_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='artwork.techniques_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.techniques_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='artwork.creators.display_name_facet'
        limit={5}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        sortBy={['name']}
        title={getLabel('artwork.creators.display_name_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='artwork.creators.nationality_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.creators.nationality_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='artwork.locations.name_facet'
        limit={5}
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        sortBy={['name']}
        title={getLabel('artwork.locations.name_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='artwork.locations.country_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.locations.country_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='artwork.locations.state_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.locations.state_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='artwork.locations.city_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('artwork.locations.city_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='visual_context.general_subject_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('visual_context.general_subject_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='visual_context.subject_cultural_context_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('visual_context.subject_cultural_context_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='visual_context.specific_subject_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('visual_context.specific_subject_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='document_format_facet'
        limit={MAX_LIMIT}
        title={getLabel('document_format_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='document_type_facet'
        limit={MAX_LIMIT}
        title={getLabel('document_type_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='orientation_facet'
        limit={MAX_LIMIT}
        title={getLabel('orientation_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='size_facet'
        limit={MAX_LIMIT}
        title={getLabel('size_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='aperture_facet'
        limit={MAX_LIMIT}
        title={getLabel('aperture_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='binding_type_facet'
        limit={MAX_LIMIT}
        title={getLabel('binding_type_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='binding_color_facet'
        limit={MAX_LIMIT}
        title={getLabel('binding_color_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='sewing_supports_visible_facet'
        title={getLabel('sewing_supports_visible_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <FacetSlider
        attribute='number_sewing_supports_facet'
        title={getLabel('number_sewing_supports_facet')}
        useRangeSlider={useRange}
      />
      <FacetList
        attribute='spine_features_facet'
        limit={MAX_LIMIT}
        title={getLabel('spine_features_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='furniture_facet'
        limit={MAX_LIMIT}
        title={getLabel('furniture_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='fastenings_facet'
        limit={MAX_LIMIT}
        title={getLabel('fastenings_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetSlider
        attribute='number_fastenings_facet'
        title={getLabel('number_fastenings_facet')}
        useRangeSlider={useRange}
      />
      <FacetList
        attribute='location_fastenings_facet'
        limit={MAX_LIMIT}
        title={getLabel('location_fastenings_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='inscriptions_on_binding_facet'
        title={getLabel('inscriptions_on_binding_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <FacetList
        attribute='binding_ornamentation_facet'
        limit={MAX_LIMIT}
        title={getLabel('binding_ornamentation_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='binding_iconography_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('binding_iconography_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='endband_present_facet'
        title={getLabel('endband_present_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <FacetList
        attribute='endband_colors_facet'
        limit={MAX_LIMIT}
        title={getLabel('endband_colors_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='endband_style_facet'
        limit={MAX_LIMIT}
        title={getLabel('endband_style_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='binding_relationship_facet'
        limit={MAX_LIMIT}
        title={getLabel('binding_relationship_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='decorated_fore_edges_facet'
        limit={MAX_LIMIT}
        title={getLabel('decorated_fore_edges_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='uncut_fore_edges_facet'
        title={getLabel('uncut_fore_edges_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <FacetList
        attribute='fore_edges_color_facet'
        limit={MAX_LIMIT}
        title={getLabel('fore_edges_color_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetSlider
        attribute='bookmarks_registers_facet'
        title={getLabel('bookmarks_registers_facet')}
        useRangeSlider={useRange}
      />
      <FacetList
        attribute='bookmark_register_color_facet'
        limit={MAX_LIMIT}
        title={getLabel('bookmark_register_color_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='bookmark_style_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('bookmark_style_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='text_technology_facet'
        limit={MAX_LIMIT}
        title={getLabel('text_technology_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='text_columns_facet'
        limit={MAX_LIMIT}
        title={getLabel('text_columns_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='page_contents_facet'
        limit={MAX_LIMIT}
        title={getLabel('page_contents_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='ruling_facet'
        title={getLabel('ruling_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <FacetList
        attribute='ruling_color_facet'
        limit={MAX_LIMIT}
        title={getLabel('ruling_color_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetToggle
        attribute='rubrication_facet'
        title={getLabel('rubrication_facet')}
        useToggleRefinement={useToggleRefinement}
      />
      <FacetList
        attribute='rubrication_color_facet'
        limit={MAX_LIMIT}
        title={getLabel('rubrication_color_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='legibility_facet'
        limit={MAX_LIMIT}
        title={getLabel('legibility_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='script_facet'
        limit={MAX_LIMIT}
        title={getLabel('script_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='language_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('language_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='simulated_script_facet'
        limit={MAX_LIMIT}
        title={getLabel('simulated_script_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='illumination_type_facet'
        limit={MAX_LIMIT}
        title={getLabel('illumination_type_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='illumination_iconography_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('illumination_iconography_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='actions.verb_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('actions.verb_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='actions.entity_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('actions.entity_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='actions.entity_descriptors_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('actions.entity_descriptors_facet')}
        useRefinementList={useRefinementList}
      />
      <FacetList
        attribute='actions.body_descriptors_facet'
        showMore
        showMoreLimit={MAX_SHOW_MORE_LIMIT}
        title={getLabel('actions.body_descriptors_facet')}
        useRefinementList={useRefinementList}
      />
    </Segment>
  );
};

export default SearchFacets;