// @flow

import { useCallback, useMemo } from 'react';
import _ from 'underscore';
import Qualifiables from '../utils/Qualifiables';

const useQualifiable = (attributes) => {
  /**
   * Adds the `resolve` attribute for any column with `object` and `group` attributes.
   *
   * @type {[]}
   */
  const columns = useMemo(() => {
    const value = [];

    _.each(attributes, (c) => {
      const column = { ...c };

      if (column.object && column.group) {
        const resolve = (item) => Qualifiables.getValueListValue(item, column.object, column.group);
        _.extend(column, { resolve })
      }

      value.push(column);
    });

    return value;
  }, [attributes]);

  /**
   * Adds the `sort_by_object` and `sort_by_group` parameters if the current sort column
   * contains `object` and `group` attributes.
   *
   * @type {function(*): *}
   */
  const getParameters = useCallback((params) => {
    const sortColumn = _.findWhere(columns, { name: params.sort_by });

    if (sortColumn && sortColumn.object && sortColumn.group) {
      _.extend(params, { sort_by_object: sortColumn.object, sort_by_group: sortColumn.group });
    }

    return params;
  }, [columns]);

  return {
    columns,
    getParameters
  };
};

export default useQualifiable;