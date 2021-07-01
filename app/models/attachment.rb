class Attachment < ApplicationRecord
  # Includes
  include Rails.application.routes.url_helpers

  # Relationships
  belongs_to :attachable, polymorphic: true, optional: true
  has_many :qualifications, as: :qualifiable
  has_many :value_lists, through: :qualifications, as: :qualifiable

  # Active storage
  has_one_attached :file

  # Callbacks
  after_create :generate_thumbnail
  before_save :set_primary

  # Resourceable parameters
  allow_params qualifications_attributes: [
    :id,
    :qualifiable_id,
    :qualifiable_type,
    :value_list_id,
    :notes,
    :persistent,
    :_destroy
  ]

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
