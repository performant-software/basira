// @flow

import type { Artwork } from '../types/Artwork';
import Session from './Session';
import type { PhysicalComponent } from '../types/PhysicalComponent';
import type { Document } from '../types/Document';
import type { VisualContext } from '../types/VisualContext';

class Permissions {
  /**
   * Returns `true` if the passed artwork can be deleted by the current user.
   *
   * @param artwork
   *
   * @returns {*|boolean}
   */
  canDeleteArtwork(artwork: Artwork) {
    return Session.isAdmin() || Session.getUserId() === artwork.created_by_id;
  }

  /**
   * Returns `true` if the passed document can be deleted by the current user.
   *
   * @param document
   *
   * @returns {*|boolean}
   */
  canDeleteDocument(document: Document) {
    return Session.isAdmin() || Session.getUserId() === document.created_by_id;
  }

  /**
   * Returns `true` if the passed physical component can be deleted by the current user.
   *
   * @param physicalComponent
   *
   * @returns {*|boolean}
   */
  canDeletePhysicalComponent(physicalComponent: PhysicalComponent) {
    return Session.isAdmin() || Session.getUserId() === physicalComponent.created_by_id;
  }

  /**
   * Returns `true` if the passed visual context can be deleted by the current user.
   *
   * @param visualContext
   *
   * @returns {*|boolean}
   */
  canDeleteVisualContext(visualContext: VisualContext) {
    return Session.isAdmin() || Session.getUserId() === visualContext.created_by_id;
  }
}

export default new Permissions();