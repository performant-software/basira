// @flow

import React, { type ComponentType } from 'react';
import { useEditContainer } from 'react-components';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'underscore';

type Config = {
  onLoad: (params: any) => Promise<any>,
  onSave: (item: any) => Promise<any>,
  validate?: (item: any) => any
};

const useEditPage = (WrappedComponent: ComponentType<any>, config: Config) => (
  (props: any) => {
    const { id } = useParams();
    const history = useHistory();

    const { pathname } = history.location;
    const url = pathname.substring(0, pathname.lastIndexOf('/'));

    /**
     * If we're saving a new record, navigate to the new ID.
     *
     * @param record
     */
    const afterSave = (record) => {
      if (!id) {
        history.replace({
          pathname: `${url}/${record.id}`,
          state: {
            saved: true
          }
        });
      }
    };

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
        onSave={(item) => config.onSave(item).then(afterSave)}
      />
    );
  }
);

export default useEditPage;
