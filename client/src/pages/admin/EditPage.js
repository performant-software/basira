// @flow

import React from 'react';
import { useEditContainer } from 'react-components';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container, Segment } from 'semantic-ui-react';

const useEditPage = (WrappedComponent, config) => (props) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const history = useHistory();

  const EditPage = (innerProps) => {
    const { pathname } = innerProps.history.location;
    const url = pathname.substring(0, pathname.lastIndexOf('/'));
    const { item } = innerProps;

    return (
      <Container>
        <Segment
          basic
          textAlign='right'
        >
          <Button
            content={t('Common.buttons.save')}
            onClick={() => {
              config
                .onSave(item)
                .then(() => history.replace({
                  pathname: url,
                  state: {
                    saved: true
                  }
                }));
            }}
            primary
          />
          <Button
            content={t('Common.buttons.cancel')}
            inverted
            onClick={() => history.goBack()}
            primary
          />
        </Segment>
        <WrappedComponent
          {...innerProps}
          t={t}
        />
      </Container>
    );
  };

  const Component = useEditContainer(EditPage);

  return (
    <Component
      {...props}
      item={{ id }}
      onInitialize={config.onLoad}
    />
  );
};

export default useEditPage;
