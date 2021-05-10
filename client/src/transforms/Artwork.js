// @flow

import ArtworkTitles from './ArtworkTitles';
import FormDataTransform from './FormDataTransform';

import type { Artwork as ArtworkType } from '../types/Artwork';

/**
 * Class for handling transforming artwork records.
 */
class Artwork extends FormDataTransform {
  /**
   * Returns the artwork parameter name.
   *
   * @returns {string}
   */
  getParameterName() {
    return 'artwork';
  }

  /**
   * Returns the artwork payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'date',
      'date_descriptor',
      'height',
      'width',
      'depth',
      'notes',
      'published',
      'repository_work_url',
      'accession_number'
    ];
  }

  /**
   * Returns the artwork object to be sent to the server on POST/PUT requests.
   *
   * @param artwork
   *
   * @returns {FormData}
   */
  toPayload(artwork: ArtworkType): FormData {
    const formData = super.toPayload(artwork);

    ArtworkTitles.appendFormData(formData, this.getParameterName(), artwork);

    return formData;
  }
}

export default new Artwork();
