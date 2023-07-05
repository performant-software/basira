// @flow

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const queryBy = [
  'artwork.artwork_titles.title',
  'artwork.creators.name',
  'artwork.creators.display_name',
  'artwork.locations.name',
  'artwork.locations.city',
  'artwork.locations.state',
  'artwork.locations.country',
  'artwork.name',
  'fore_edge_text',
  'identity',
  'inscription_text',
  'name',
  'notes',
  'physical_component.name',
  'transcription',
  'transcription_expanded',
  'transcription_translation',
  'visual_context.name'
];

const QUERY_BY_SEPARATOR = ',';

const adapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.REACT_APP_TYPESENSE_API_KEY || 'xyz',
    nodes: [{
      host: process.env.REACT_APP_TYPESENSE_HOST || 'localhost',
      port: process.env.REACT_APP_TYPESENSE_PORT || '8108',
      protocol: process.env.REACT_APP_TYPESENSE_PROTOCOL || 'http'
    }]
  },
  additionalSearchParameters: {
    query_by: queryBy.join(QUERY_BY_SEPARATOR),
  }
});

const { searchClient } = adapter;
export default searchClient;
