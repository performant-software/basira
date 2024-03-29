module AttachableSerializer
  extend ActiveSupport::Concern

  included do
    index_attributes primary_attachment: [:id, :file_url, :primary, :thumbnail_url]

    show_attributes primary_attachment: [:id, :file_url, :primary, :thumbnail_url, qualifications: QualificationsSerializer],
                    attachments: [:id, :file_url, :primary, :thumbnail_url, qualifications: QualificationsSerializer]
  end
end
