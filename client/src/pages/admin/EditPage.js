// @flow

import React, { type ComponentType } from 'react';
import { useEditContainer } from 'react-components';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import _ from 'underscore';

type Config = {
  onLoad: (params: any) => Promise<any>,
  onSave: (item: any) => Promise<any>,
  validate: (item: any) => any
};

const useEditPage = (WrappedComponent: ComponentType<any>, config: Config) => (
  (props: any) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const history = useHistory();

    const EditPage = (innerProps) => (
      <Container>
        <WrappedComponent
          {...innerProps}
          t={t}
        />
      </Container>
    );

    const EditContainer = useEditContainer(EditPage);
    const { pathname } = history.location;
    const url = pathname.substring(0, pathname.lastIndexOf('/'));

    return (
      <EditContainer
        {...props}
        {..._.pick(config, 'defaults', 'required', 'validate')}
        item={{ id }}
        onInitialize={config.onLoad}
        onSave={(item) => (
          config
            .onSave(item)
            .then(() => history.replace({
              pathname: url,
              state: {
                saved: true
              }
            }))
        )}
      />
    );
  }
);

export default useEditPage;
