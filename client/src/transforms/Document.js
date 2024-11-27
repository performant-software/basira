// @flow

import Actions from './Actions';
import Attachments from './Attachments';
import FormDataTransform from './FormDataTransform';
import Qualifications from './Qualifications';

import type { Document as DocumentType } from '../types/Document';

/**
 * Class for handling transforming document records.
 */
class Document extends FormDataTransform {
  /**
   * Returns the document parameter name.
   *
   * @returns {string}
   */
  getParameterName() {
    return 'document';
  }

  /**
   * Returns the document payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'artwork_id',
      'visual_context_id',
      'name',
      'notes',
      'number_sewing_supports',
      'number_fastenings',
      'inscriptions_on_binding',
      'inscription_text',
      'endband_present',
      'uncut_fore_edges',
      'fore_edge_text',
      'bookmarks_registers',
      'text_columns',
      'ruling',
      'rubrication',
      'identity',
      'transcription',
      'transcription_expanded',
      'transcription_translation'
    ];
  }

  /**
   * Returns the document object to be sent to the server on POST/PUT requests.
   *
   * @param document
   *
   * @returns {FormData}
   */
  toPayload(document: DocumentType): FormData {
    const formData = super.toPayload(document);

    Actions.appendFormData(formData, this.getParameterName(), document);
    Attachments.appendFormData(formData, this.getParameterName(), document);
    Qualifications.appendFormData(formData, this.getParameterName(), document);

    return formData;
  }
}

export default new Document();
