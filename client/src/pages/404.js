// @flow

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Header } from 'semantic-ui-react';
import RecordPage from '../components/RecordPage';
import './404.css';

const NotFound404 = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <RecordPage
      className='not-found'
    >
      <Header
        size='huge'
      >
        { t('404.messages.notFound.header') }
      </Header>
      <p>
        { t('404.messages.notFound.content') }
      </p>
      <div>
        <Button
          content={t('Common.buttons.back')}
          icon='arrow alternate circle left outline'
          onClick={() => history.go(-2)}
          primary
        />
      </div>
    </RecordPage>
  );
};

export default NotFound404;
