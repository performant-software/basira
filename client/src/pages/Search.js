// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Menu,
  Segment
} from 'semantic-ui-react';
import _ from 'underscore';
import CurrentFacets from '../components/CurrentFacets';
import FacetList from '../components/FacetList';
import FacetSlider from '../components/FacetSlider';
import FacetToggle from '../components/FacetToggle';
import FacetsButton from '../components/FacetsButton';
import SearchBox from '../components/SearchBox';
import SearchPagination from '../components/SearchPagination';
import SearchResults from '../components/SearchResults';
import SearchResultDescription from '../components/SearchResultDescription';
import SearchResultsPerPage from '../components/SearchResultsPerPage';
import SearchStats from '../components/SearchStats';
import SearchThumbnail from '../components/SearchThumbnail';
import searchClient from '../config/Search';
import useFacetLabels from '../hooks/FacetLabels';
import './Search.css';

const MAX_LIMIT = 100;
const MAX_SHOW_MORE_LIMIT = 1000;

const Search = () => {
  const { getLabel } = useFacetLabels();
  const { t } = useTranslation();

  /**
   * Looks up the label for the current refinements.
   *
   * @type {function(*): *}
   */
  const transformCurrentFacets = useCallback((items) => (
    _.map(items, (item) => ({ ...item, label: getLabel(item.label) }))
  ), []);

  return (
    <Container
      className='search'
      fluid
    >
      <Menu
        inverted
        size='large'
      >
        <Menu.Item>
          <Header
            content='B'
            inverted
          />
        </Menu.Item>
      </Menu>
      <InstantSearch
        indexName='documents'
        searchClient={searchClient}
      >
        <Container>
          <Grid
            padded
            relaxed
          >
            <Grid.Row
              columns={1}
            >
              <Grid.Column>
                <SearchBox
                  fluid
                  size='large'
                />
                <div
                  className='stats-container'
                >
                  <SearchStats />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row
              columns={3}
            >
              <Grid.Column
                width={3}
              >
                <FacetsButton
                  color='red'
                  content={t('Search.buttons.clearFacets')}
                  icon='trash alternate outline'
                />
              </Grid.Column>
              <Grid.Column
                width={10}
              >
                <CurrentFacets
                  limit={6}
                  transformItems={transformCurrentFacets}
                />
              </Grid.Column>
              <Grid.Column
                textAlign='right'
                width={3}
              >
                <SearchResultsPerPage
                  options={[10, 25, 50]}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row
              columns={1}
            >
              <Grid.Column
                className='facets'
                width={5}
              >
                <Segment
                  padded
                  raised
                >
                  <FacetSlider
                    attribute='artwork.date_range_facet'
                    title={getLabel('artwork.date_range_facet')}
                  />
                  <FacetList
                    attribute='artwork.object_work_type_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('artwork.object_work_type_facet')}
                  />
                  <FacetList
                    attribute='artwork.materials_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('artwork.materials_facet')}
                  />
                  <FacetList
                    attribute='artwork.techniques_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('artwork.techniques_facet')}
                  />
                  <FacetList
                    attribute='artwork.creators.display_name_facet'
                    limit={5}
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    sortBy={['name']}
                    title={getLabel('artwork.creators.display_name_facet')}
                  />
                  <FacetList
                    attribute='artwork.creators.nationality_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('artwork.creators.nationality_facet')}
                  />
                  <FacetList
                    attribute='artwork.locations.name_facet'
                    limit={5}
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    sortBy={['name']}
                    title={getLabel('artwork.locations.name_facet')}
                  />
                  <FacetList
                    attribute='artwork.locations.country_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('artwork.locations.country_facet')}
                  />
                  <FacetList
                    attribute='artwork.locations.state_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('artwork.locations.state_facet')}
                  />
                  <FacetList
                    attribute='artwork.locations.city_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('artwork.locations.city_facet')}
                  />
                  <FacetList
                    attribute='visual_context.general_subject_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('visual_context.general_subject_facet')}
                  />
                  <FacetList
                    attribute='visual_context.subject_cultural_context_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('visual_context.subject_cultural_context_facet')}
                  />
                  <FacetList
                    attribute='visual_context.specific_subject_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('visual_context.specific_subject_facet')}
                  />
                  <FacetList
                    attribute='document_format_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('document_format_facet')}
                  />
                  <FacetList
                    attribute='document_type_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('document_type_facet')}
                  />
                  <FacetList
                    attribute='orientation_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('orientation_facet')}
                  />
                  <FacetList
                    attribute='size_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('size_facet')}
                  />
                  <FacetList
                    attribute='aperture_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('aperture_facet')}
                  />
                  <FacetList
                    attribute='binding_type_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('binding_type_facet')}
                  />
                  <FacetList
                    attribute='binding_color_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('binding_color_facet')}
                  />
                  <FacetToggle
                    attribute='sewing_supports_visible_facet'
                    title={getLabel('sewing_supports_visible_facet')}
                  />
                  <FacetSlider
                    attribute='number_sewing_supports_facet'
                    title={getLabel('number_sewing_supports_facet')}
                  />
                  <FacetList
                    attribute='spine_features_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('spine_features_facet')}
                  />
                  <FacetList
                    attribute='furniture_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('furniture_facet')}
                  />
                  <FacetList
                    attribute='fastenings_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('fastenings_facet')}
                  />
                  <FacetSlider
                    attribute='number_fastenings_facet'
                    title={getLabel('number_fastenings_facet')}
                  />
                  <FacetList
                    attribute='location_fastenings_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('location_fastenings_facet')}
                  />
                  <FacetToggle
                    attribute='inscriptions_on_binding_facet'
                    title={getLabel('inscriptions_on_binding_facet')}
                  />
                  <FacetList
                    attribute='binding_ornamentation_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('binding_ornamentation_facet')}
                  />
                  <FacetList
                    attribute='binding_iconography_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('binding_iconography_facet')}
                  />
                  <FacetToggle
                    attribute='endband_present_facet'
                    title={getLabel('endband_present_facet')}
                  />
                  <FacetList
                    attribute='endband_colors_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('endband_colors_facet')}
                  />
                  <FacetList
                    attribute='endband_style_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('endband_style_facet')}
                  />
                  <FacetList
                    attribute='binding_relationship_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('binding_relationship_facet')}
                  />
                  <FacetList
                    attribute='decorated_fore_edges_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('decorated_fore_edges_facet')}
                  />
                  <FacetToggle
                    attribute='uncut_fore_edges_facet'
                    title={getLabel('uncut_fore_edges_facet')}
                  />
                  <FacetList
                    attribute='fore_edges_color_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('fore_edges_color_facet')}
                  />
                  <FacetSlider
                    attribute='bookmarks_registers_facet'
                    title={getLabel('bookmarks_registers_facet')}
                  />
                  <FacetList
                    attribute='bookmark_register_color_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('bookmark_register_color_facet')}
                  />
                  <FacetList
                    attribute='bookmark_style_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('bookmark_style_facet')}
                  />
                  <FacetList
                    attribute='text_technology_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('text_technology_facet')}
                  />
                  <FacetList
                    attribute='text_columns_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('text_columns_facet')}
                  />
                  <FacetList
                    attribute='page_contents_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('page_contents_facet')}
                  />
                  <FacetToggle
                    attribute='ruling_facet'
                    title={getLabel('ruling_facet')}
                  />
                  <FacetList
                    attribute='ruling_color_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('ruling_color_facet')}
                  />
                  <FacetToggle
                    attribute='rubrication_facet'
                    title={getLabel('rubrication_facet')}
                  />
                  <FacetList
                    attribute='rubrication_color_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('rubrication_color_facet')}
                  />
                  <FacetList
                    attribute='legibility_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('legibility_facet')}
                  />
                  <FacetList
                    attribute='script_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('script_facet')}
                  />
                  <FacetList
                    attribute='language_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('language_facet')}
                  />
                  <FacetList
                    attribute='simulated_script_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('simulated_script_facet')}
                  />
                  <FacetList
                    attribute='illumination_type_facet'
                    limit={MAX_LIMIT}
                    title={getLabel('illumination_type_facet')}
                  />
                  <FacetList
                    attribute='illumination_iconography_facet'
                    showMore
                    showMoreLimit={MAX_SHOW_MORE_LIMIT}
                    title={getLabel('illumination_iconography_facet')}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column
                className='results'
                width={11}
              >
                <SearchResults
                  as={Link}
                  asProps={(document) => ({
                    to: `/documents/${document.id}`
                  })}
                  link
                  renderDescription={(document) => document.artwork.date_descriptor}
                  renderExtra={(document) => (
                    <SearchResultDescription
                      artwork={document.artwork}
                    />
                  )}
                  renderHeader={(document) => document.name}
                  renderImage={(document) => (
                    <SearchThumbnail
                      document={document}
                    />
                  )}
                  renderMeta={(document) => document.artwork.name}
                />
                <Container
                  className='pagination'
                  fluid
                >
                  <SearchPagination
                    scrollToTop
                  />
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </InstantSearch>
    </Container>
  );
};

export default Search;
