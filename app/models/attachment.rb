class Attachment < ApplicationRecord
  # Includes
  include Rails.application.routes.url_helpers

  # Relationships
  belongs_to :attachable, polymorphic: true, optional: true
  
  # Active storage
  has_one_attached :file

  # Callbacks
  after_create :generate_thumbnail
  before_save :set_primary

  def file_url
    return nil unless self.file&.attached?

    url_for(self.file)
  end

  def thumbnail_url
    return nil unless self.file&.attached?

    url_for(self.file.variant(resize_to_fit: [250, nil]))
  end

  private

  def generate_thumbnail
    return unless self.file&.attached?

    CreateImageThumbnailJob.perform_later(self.id)
  end

  def set_primary
    self.primary = false unless self.primary.present?
  end
end
