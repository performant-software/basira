// @flow

import { useEffect, useState } from 'react';

const useSidebar = (menuBarRef: { current: null | HTMLElement }) => {
  const [height, setHeight] = useState();

  const menuBarInstance = menuBarRef?.current || {};
  const { clientHeight } = menuBarInstance;

  /**
   * Sets CSS height when the client height attribute changes.
   */
  useEffect(() => {
    if (clientHeight) {
      setHeight(`calc(100vh - ${clientHeight}px`);
    }
  }, [clientHeight]);

  return {
    height
  };
};

export default useSidebar;
