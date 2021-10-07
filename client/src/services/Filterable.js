// @flow

import _ from 'underscore';

const FilterKeys = {
  associationColumn: 'association_column',
  associationName: 'association_name',
  attributeName: 'attribute_name',
  baseClass: 'base_class',
  operator: 'operator',
  type: 'type',
  value: 'value'
};

/**
 * Prepares the filter parameters to be sent to the server.
 *
 * @param params
 *
 * @returns {{[p: string]: *}}
 */
const prepareParameters = (params: any) => ({
  ...params,
  filters: _.map(params.filters, transformKeys.bind(this))
});

const transformKeys = (filter) => {
  const newFilter = {};

  _.each(_.keys(FilterKeys), (key) => {
    newFilter[FilterKeys[key]] = filter[key];
  });

  return newFilter;
};

export default {
  prepareParameters
};
