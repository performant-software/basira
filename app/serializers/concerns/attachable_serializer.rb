module AttachableSerializer
  extend ActiveSupport::Concern

  included do
    index_attributes primary_attachment: [:id, :file_url, :primary]
    show_attributes primary_attachment: [:id, :file_url, :primary], attachments: [:id, :file_url, :primary]
  end
end
