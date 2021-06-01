// @flow

import Attachments from './Attachments';
import FormDataTransform from './FormDataTransform';

import type { PhysicalComponent as PhysicalComponentType } from '../types/PhysicalComponent';

/**
 * Class for handling transforming physical component records.
 */
class PhysicalComponent extends FormDataTransform {
  /**
   * Returns the physical component parameter name.
   *
   * @returns {string}
   */
  getParameterName() {
    return 'physical_component';
  }

  /**
   * Returns the physical component payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'artwork_id',
      'name',
      'height',
      'width',
      'depth',
      'notes'
    ];
  }

  /**
   * Returns the physical component object to be sent to the server on POST/PUT requests.
   *
   * @param physicalComponent
   *
   * @returns {FormData}
   */
  toPayload(physicalComponent: PhysicalComponentType): FormData {
    const formData = super.toPayload(physicalComponent);

    Attachments.appendFormData(formData, this.getParameterName(), physicalComponent);

    return formData;
  }
}

export default new PhysicalComponent();
