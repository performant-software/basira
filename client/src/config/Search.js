import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

console.log(process.env.REACT_APP_TYPESENSE_API_KEY);

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
    query_by: 'name',
  }
});

const { searchClient } = adapter;
export default searchClient;
