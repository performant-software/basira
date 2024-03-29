class Attachment < ApplicationRecord
  # Includes
  include Qualifiable
  include Rails.application.routes.url_helpers
  include Recordable

  # Relationships
  belongs_to :attachable, polymorphic: true, optional: true

  # Active storage
  has_one_attached :file

  # Callbacks
  after_create :generate_thumbnail

  def file_url
    return nil unless self.file&.attached?

    url_for(self.file)
  end

  def thumbnail_url
    return nil unless self.file&.attached? and self.file.variable?

    url_for(self.file.variant(resize_to_fit: [250, nil]))
  end

  private

  def generate_thumbnail
    return unless self.file&.attached? and self.file.variable?

    CreateImageThumbnailJob.perform_later(self.id)
  end
end
