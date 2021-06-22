// @flow

import ArtworkTitles from './ArtworkTitles';
import Attachments from './Attachments';
import FormDataTransform from './FormDataTransform';
import Locations from './Locations';
import Participations from './Participations';

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
      'notes_external',
      'notes_internal',
      'published',
      'repository_work_url',
      'accession_number'
    ];
  }

  /**
   * Returns the passed artwork as a dropdown option.
   *
   * @param artwork
   *
   * @returns {{text: string, value: number, key: number}}
   */
  toDropdown(artwork: ArtworkType) {
    return {
      key: artwork.id,
      value: artwork.id,
      text: artwork.primary_title && artwork.primary_title.title
    };
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
    Locations.appendFormData(formData, this.getParameterName(), artwork);
    Participations.appendFormData(formData, this.getParameterName(), artwork);

    return formData;
  }
}

export default new Artwork();
