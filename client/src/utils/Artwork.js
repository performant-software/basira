// @flow

import _ from 'underscore';

/**
 * Returns a flat array of Visual Contexts
 * from the passed Artwork.
 *
 * @param artwork
 *
 * @returns {Array<VisualContext>}
 */
export const getVisualContexts = (artwork: any) => (
  _.flatten(artwork.children.map((pc) => pc.children))
);

/**
 * Returns a flat array of Physical Components
 * from the passed Artwork.
 *
 * @param artwork
 *
 * @returns {Array<PhysicalComponent>}
 */
export const getPhysicalComponents = (artwork: any) => artwork.children;
