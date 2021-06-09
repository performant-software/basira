// @flow

import React, { type ComponentType } from 'react';
import { useEditContainer } from 'react-components';
import { useParams } from 'react-router-dom';
import _ from 'underscore';

type Config = {
  onLoad: (params: any) => Promise<any>,
  onSave: (item: any) => Promise<any>,
  validate?: (item: any) => any
};

const useEditPage = (WrappedComponent: ComponentType<any>, config: Config) => (
  (props: any) => {
    const { id } = useParams();

    const EditPage = (innerProps) => (
      <WrappedComponent
        {...innerProps}
      />
    );

    const EditContainer = useEditContainer(EditPage);

    return (
      <EditContainer
        {...props}
        {..._.pick(config, 'defaults', 'getArtworkId', 'required', 'validate')}
        item={{ id }}
        onInitialize={config.onLoad}
        onSave={config.onSave.bind(this)}
      />
    );
  }
);

export default useEditPage;
