// @flow

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import SearchContext from '../context/Search';

const SearchLink = () => {
  const { search } = useContext(SearchContext);
  const { t } = useTranslation();

  return (
    <Button
      as={Link}
      basic
      content={t('SearchLink.buttons.back')}
      icon='arrow alternate circle left outline'
      inverted
      to={`/${search || ''}`}
    />
  );
};

export default SearchLink;
