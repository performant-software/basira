// @flow

import { useEditContainer } from '@performant-software/shared-components';
import type { EditContainerProps } from '@performant-software/shared-components/types';
import React, { type ComponentType } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'underscore';

type Config = {
  onLoad: (params: any) => Promise<any>,
  onSave: (item: any) => Promise<any>,
  resolveValidationError?: (error: any) => Array<string>,
  validate?: (item: any) => any
};

const useEditPage = (WrappedComponent: ComponentType<any>, config: Config) => (
  (props: any) => {
    const { id } = useParams();
    const history = useHistory();

    const { pathname } = history.location;
    const url = pathname.substring(0, pathname.lastIndexOf('/'));

    let tab;

    /**
     * Navigate to the new URL to force the component to be re-mounted. This ensures that the IDs of new records
     * are appropriately updated.
     *
     * @param record
     */
    const afterSave = (record) => {
      history.replace({
        pathname: `${url}/${record.id}`,
        state: {
          saved: true,
          tab
        }
      });
    };

    const EditPage = (innerProps) => (
      <WrappedComponent
        {...innerProps}
        onTabClick={(t) => {
          tab = t;
        }}
      />
    );

    const EditContainer = useEditContainer(EditPage);

    return (
      <EditContainer
        {...props}
        {..._.pick(config, 'defaults', 'getArtworkId', 'required', 'validate')}
        item={{ id }}
        onInitialize={(params) => config.onLoad(params)
          .catch((err) => {
            if (err.response?.status === 404) {
              history.push('/admin/404');
            }
          })}
        onSave={(item) => config.onSave(item).then(afterSave)}
        resolveValidationError={config.resolveValidationError}
      />
    );
  }
);

export default useEditPage;

export type EditPageProps = {
  ...EditContainerProps,
  onTabClick: (tab: string) => void
};
