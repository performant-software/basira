module Attachable
  extend ActiveSupport::Concern

  included do
    # Class attributes
    class_attribute :multiple

    # Relationships
    has_many :attachments, -> { order(primary: :desc) }, as: :attachable, dependent: :destroy
    has_one :primary_attachment, -> { where(primary: true) }, as: :attachable, class_name: 'Attachment'

    # Nested attributes
    accepts_nested_attributes_for :attachments, allow_destroy: true

    # Resourceable parameters
    allow_params attachments_attributes: [:id, :file, :primary, :_destroy, qualifications_attributes: [
      :id, :qualifiable_id, :qualifiable_type, :value_list_id, :form_field, :notes, :persistent, :_destroy]
    ]

    # Actions
    after_save :rename_attachments

    private

    def generate_filename(attachment, index)
      filename = "#{self.class.to_s}#{self.id}"
      filename += "-#{index}" if self.class.multiple
      filename += ".#{attachment.file.filename.extension}"

      filename
    end

    def rename_attachments
      self.attachments.order(:created_at).each.with_index do |attachment, index|
        # Generate the filename
        filename = generate_filename(attachment, index + 1)

        # Update the attachment filename
        attachment.file.blob.update(filename: filename) unless attachment.file.blob.filename == filename

        # Update variant file names
        attachment.file.variant_records.each do |variant|
          next unless variant.blob.filename != filename
          variant.blob.update(filename: filename)
        end
      end
    end
  end

  class_methods do
    def allow_multiple(multiple)
      self.multiple = multiple
    end

    def attachments_preload
      { attachments: [file_attachment: :blob] }
    end

    def primary_attachment_preload
      { primary_attachment: [file_attachment: :blob] }
    end
  end

end
