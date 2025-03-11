// @flow

import { FacetList } from '@performant-software/semantic-components';
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useState
} from 'react';
import { useRefinementList } from 'react-instantsearch-hooks-web';
import { Icon, Popup } from 'semantic-ui-react';
import _ from 'underscore';
import ValueLists from '../services/ValueLists';
import './SearchFacet.css';

const MAX_SHOW_MORE_LIMIT = 1000;

type Props = {
  attribute: string,
  defaultActive?: boolean,
  group: string,
  object: string,
  searchable?: boolean,
  showMore?: boolean,
  title?: string,
  toggleable: boolean
};

const SearchFacet = forwardRef((props: Props, ref: HTMLElement) => {
  const [loaded, setLoaded] = useState(false);
  const [valueLists, setValueLists] = useState([]);

  /**
   * Groups the facets by the name value for lookup.
   */
  const groupedValueLists = useMemo(() => _.indexBy(valueLists, 'human_name'), [valueLists]);

  /**
   * Returns the "comment" attribute for the value list with the passed name.
   *
   * @type {function(*): *}
   */
  const getDescription = useCallback((item) => {
    let description;

    const valueList = groupedValueLists[item.value];
    if (valueList) {
      description = valueList.comment;
    }

    return description;
  }, [groupedValueLists]);

  /**
   * Fetches the value lists for the object/group when the facet becomes active.
   *
   * @type {(function(): void)|*}
   */
  const onActive = useCallback(() => {
    if (loaded) {
      return;
    }

    ValueLists
      .fetchAll({ object_filter: props.object, group_filter: props.group, per_page: 0})
      .then(({ data }) => setValueLists(data.value_lists))
      .finally(() => setLoaded(true));
  }, [loaded, props.group, props.object]);

  /**
   * Renders the label for the passed item.
   *
   * @type {unknown}
   */
  const renderLabel = useCallback((item) => {
    const description = getDescription(item);

    return (
      <div
        className='facet-label'
      >
        <div
          className='label'
        >
          { item.label }
          { description && (
            <Popup
              content={description}
              hideOnScroll
              mouseEnterDelay={500}
              mouseLeaveDelay={500}
              on='hover'
              trigger={(
                <Icon
                  className='info-button'
                  circular
                  size='small'
                  name='info'
                />
              )}
            />
          )}
        </div>
        <span>{ item.count }</span>
      </div>
    );
  }, [getDescription]);

  return (
    <FacetList
      attribute={props.attribute}
      className='search-facet'
      defaultActive={props.defaultActive}
      onActive={onActive}
      ref={ref}
      renderLabel={renderLabel}
      searchable={props.searchable}
      showMore={props.showMore}
      showMoreLimit={MAX_SHOW_MORE_LIMIT}
      title={props.title}
      toggleable={props.toggleable}
      useRefinementList={useRefinementList}
    />
  );
});

export default SearchFacet;
