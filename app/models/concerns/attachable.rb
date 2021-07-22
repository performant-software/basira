module Attachable
  extend ActiveSupport::Concern

  included do
    # Relationships
    has_many :attachments, -> { order(primary: :desc) }, as: :attachable, dependent: :destroy
    has_one :primary_attachment, -> { where(primary: true) }, as: :attachable, class_name: 'Attachment'

    # Nested attributes
    accepts_nested_attributes_for :attachments, allow_destroy: true

    # Resourceable parameters
    allow_params attachments_attributes: [:id, :file, :primary, :_destroy, qualifications_attributes: [
      :id, :qualifiable_id, :qualifiable_type, :value_list_id, :form_field, :notes, :persistent, :_destroy]
    ]
  end

  class_methods do
    def attachments_preload
      { attachments: [file_attachment: :blob] }
    end

    def primary_attachment_preload
      { primary_attachment: [file_attachment: :blob] }
    end
  end

end
