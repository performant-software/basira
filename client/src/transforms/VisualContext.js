// @flow

import Attachments from './Attachments';
import FormDataTransform from './FormDataTransform';
import Qualifications from './Qualifications';

import type { VisualContext as VisualContextType } from '../types/VisualContext';

/**
 * Class for handling transforming visual context records.
 */
class VisualContext extends FormDataTransform {
  /**
   * Returns the visual context parameter name.
   *
   * @returns {string}
   */
  getParameterName() {
    return 'visual_context';
  }

  /**
   * Returns the visual context payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'physical_component_id',
      'name',
      'height',
      'width',
      'depth',
      'notes',
      'beta'
    ];
  }

  /**
   * Returns the visual context object to be sent to the server on POST/PUT requests.
   *
   * @param visualContext
   *
   * @returns {FormData}
   */
  toPayload(visualContext: VisualContextType): FormData {
    const formData = super.toPayload(visualContext);

    Attachments.appendFormData(formData, this.getParameterName(), visualContext);
    Qualifications.appendFormData(formData, this.getParameterName(), visualContext);

    return formData;
  }
}

export default new VisualContext();
