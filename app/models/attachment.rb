class Attachment < ApplicationRecord
  # Includes
  include Rails.application.routes.url_helpers

  # Relationships
  belongs_to :attachable, polymorphic: true, optional: true

  # Active storage
  has_one_attached :file

  # Callbacks
  before_save :set_primary

  def file_url
    return nil unless self.file && self.file.attached?

    url_for(self.file)
  end

  private

  def set_primary
    self.primary = false unless self.primary.present?
  end
end
