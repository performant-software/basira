// @flow

import {
  CurrentFacets,
  FacetClearButton,
  SearchBox,
  SearchPagination,
  SearchResults,
  SearchResultsPerPage,
  SearchResultsSort,
  SearchStats
} from '@performant-software/semantic-components';
import { history as historyConfig } from 'instantsearch.js/es/lib/routers';
import React, { useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  InstantSearch,
  useClearRefinements,
  useCurrentRefinements,
  useHits,
  useHitsPerPage,
  usePagination,
  useSearchBox,
  useSortBy,
  useStats
} from 'react-instantsearch-hooks-web';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';
import _ from 'underscore';
import Banner from '../components/Banner';
import NavBar from '../components/NavBar';
import PageFooter from '../components/PageFooter';
import SearchContext from '../context/Search';
import SearchFacets from '../components/SearchFacets';
import SearchResultDescription from '../components/SearchResultDescription';
import SearchThumbnail from '../components/SearchThumbnail';
import searchClient from '../config/Search';
import SearchHistory from '../components/SearchHistory';
import useFacetLabels from '../hooks/FacetLabels';
import './Search.css';

const Search = () => {
  const history = useHistory();
  const location = useLocation();

  const { setSearch } = useContext(SearchContext);
  const { getLabel } = useFacetLabels();
  const { t } = useTranslation();

  /**
   * Looks up the label for the current refinements.
   *
   * @type {function(*): *}
   */
  const transformCurrentFacets = useCallback((items) => (
    _.map(items, (item) => ({ ...item, label: getLabel(item.label) }))
  ), [getLabel]);

  /**
   * Set the search in the context when the location.search attribute changes.
   */
  useEffect(() => setSearch(location.search), [location.search]);

  return (
    <Container
      className='search'
      fluid
    >
      <NavBar />
      <Banner />
      <InstantSearch
        indexName={process.env.REACT_APP_TYPESENSE_COLLECTION_NAME}
        routing={{
          router: historyConfig({
            push: (url) => {
              const { pathname, search } = new URL(url);
              history.push(`${pathname}${search}`);
            }
          })
        }}
        searchClient={searchClient}
      >
        <SearchHistory />
        <Container>
          <Grid
            relaxed
          >
            <Grid.Row
              columns={1}
            >
              <Grid.Column>
                <SearchBox
                  fluid
                  size='large'
                  useSearchBox={useSearchBox}
                />
                <div
                  className='stats-container'
                >
                  <Link
                    to='search_history'
                  >
                    { t('Search.labels.viewRecent') }
                  </Link>
                  <SearchStats
                    useStats={useStats}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row
              columns={3}
            >
              <Grid.Column
                width={3}
              >
                <FacetClearButton
                  color='red'
                  content={t('Search.buttons.clearFacets')}
                  icon='trash alternate outline'
                  useClearRefinements={useClearRefinements}
                />
              </Grid.Column>
              <Grid.Column
                width={7}
              >
                <CurrentFacets
                  limit={6}
                  transformItems={transformCurrentFacets}
                  useCurrentRefinements={useCurrentRefinements}
                />
              </Grid.Column>
              <Grid.Column
                textAlign='right'
                width={6}
              >
                <SearchResultsSort
                  items={[{
                    label: t('Search.sort.relevance.label'),
                    value: `${process.env.REACT_APP_TYPESENSE_COLLECTION_NAME}/sort/_text_match:desc`
                  }, {
                    label: t('Search.sort.artworkDate.label'),
                    description: t('Search.sort.artworkDate.descriptionAsc'),
                    value: `${process.env.REACT_APP_TYPESENSE_COLLECTION_NAME}/sort/artwork.date_start:asc`
                  }, {
                    label: t('Search.sort.artworkDate.label'),
                    description: t('Search.sort.artworkDate.descriptionDesc'),
                    value: `${process.env.REACT_APP_TYPESENSE_COLLECTION_NAME}/sort/artwork.date_start:desc`
                  }, {
                    label: t('Search.sort.creationDate.label'),
                    description: t('Search.sort.creationDate.descriptionAsc'),
                    value: `${process.env.REACT_APP_TYPESENSE_COLLECTION_NAME}/sort/artwork.created_at:asc`
                  }, {
                    label: t('Search.sort.creationDate.label'),
                    description: t('Search.sort.creationDate.descriptionDesc'),
                    value: `${process.env.REACT_APP_TYPESENSE_COLLECTION_NAME}/sort/artwork.created_at:desc`
                  }]}
                  useSortBy={useSortBy}
                />
                <SearchResultsPerPage
                  options={[10, 25, 50]}
                  useHitsPerPage={useHitsPerPage}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row
              className='results-container'
              columns={2}
            >
              <Grid.Column
                width={6}
              >
                <SearchFacets />
              </Grid.Column>
              <Grid.Column
                width={10}
              >
                <SearchResults
                  as={Link}
                  asProps={(document) => ({ to: `/documents/${document.id}` })}
                  link
                  renderDescription={(document) => document.artwork.date_descriptor}
                  renderEmptyList={() => null}
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
                  useHits={useHits}
                />
                <Container
                  className='pagination'
                  fluid
                >
                  <SearchPagination
                    scrollToTop
                    usePagination={usePagination}
                  />
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </InstantSearch>
      <PageFooter />
    </Container>
  );
};

export default Search;
