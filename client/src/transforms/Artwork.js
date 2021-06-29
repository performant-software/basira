// @flow

import ArtworkTitles from './ArtworkTitles';
import Attachments from './Attachments';
import FormDataTransform from './FormDataTransform';
import Selection from './Selection';

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
      'date_start',
      'date_end',
      'date_descriptor',
      // 'height',
      // 'width',
      // 'depth',
      'materials',
      'notes_external',
      'notes_internal',
      'object_work_types',
      'published',
      'repository_work_url',
      'techniques',
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
    Attachments.appendFormData(formData, this.getParameterName(), artwork);
    debugger
    return formData;
  }
}

export default new Artwork();
