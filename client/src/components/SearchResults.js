// @flow

import React, { type Element, type Node } from 'react';
import { ItemCollection } from '@performant-software/semantic-components';
import { useHits } from 'react-instantsearch-hooks-web';

type Props = {
  as?: Element<any>,
  asProps?: any,
  link?: boolean,
  renderDescription?: (item: any) => Node,
  renderExtra?: (item: any) => Node,
  renderHeader?: (item: any) => Node,
  renderImage?: (item: any) => Node,
  renderMeta?: (item: any) => Node
};

const SearchResults = (props: Props) => {
  const { hits } = useHits(props);

  const {
    as,
    asProps,
    link,
    renderDescription,
    renderExtra,
    renderHeader,
    renderImage,
    renderMeta
  } = props;

  return (
    <ItemCollection
      as={as}
      asProps={asProps}
      hideToggle
      items={hits}
      link={link}
      renderDescription={renderDescription}
      renderEmptyList={() => (
        <div>Nothing</div>
      )}
      renderExtra={renderExtra}
      renderHeader={renderHeader}
      renderImage={renderImage}
      renderMeta={renderMeta}
    />
  );
};

SearchResults.defaultProps = {
  as: undefined,
  asProps: undefined,
  link: undefined,
  renderDescription: undefined,
  renderExtra: undefined,
  renderHeader: undefined,
  renderImage: undefined,
  renderMeta: undefined
};

export default SearchResults;
