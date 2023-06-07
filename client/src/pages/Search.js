// @flow

import React from 'react';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import {
  Container,
  Grid,
  Header,
  Image,
  Menu
} from 'semantic-ui-react';
import searchClient from '../config/Search';
import './Search.css';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';
import { Link } from 'react-router-dom';
import SearchResultDescription from '../components/SearchResultDescription';
import SearchPagination from '../components/SearchPagination';

const Search = () => (
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
        <Grid>
          <Grid.Row
            columns={1}
          >
            <Grid.Column>
              <SearchBox
                fluid
                size='large'
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row
            columns={1}
          >
            <Grid.Column
              width={4}
            >
              Facets
            </Grid.Column>
            <Grid.Column
              className='results'
              width={12}
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
                  <Image
                    src={document.image_url}
                  />
                )}
                renderMeta={(document) => document.artwork.name}
              />
              <SearchPagination
                scrollToTop
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </InstantSearch>
  </Container>
);

export default Search;
