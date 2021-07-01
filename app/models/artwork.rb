class Artwork < ApplicationRecord
  # Includes
  include Attachable
  include Locateable
  include Participateable

  # Relationships
  has_many :artwork_titles, dependent: :destroy
  has_many :physical_components, dependent: :destroy
  has_one :primary_title, -> { where(primary: true) }, class_name: 'ArtworkTitle'
  has_many :qualifications, as: :qualifiable
  has_many :value_lists, through: :qualifications, as: :qualifiable

  # Nested attributes
  accepts_nested_attributes_for :artwork_titles, allow_destroy: true

  # Resourceable attributes
  allow_params :date_start, :date_end, :date_descriptor, :height, :width, :depth, :notes_external, :notes_internal,
               :published, :repository_work_url, :accession_number, images: [],
               artwork_titles_attributes: [:id, :title, :title_type, :notes, :primary, :_destroy],
               qualifications_attributes: [
                 :id,
                 :qualifiable_id,
                 :qualifiable_type,
                 :value_list_id,
                 :notes,
                 :persistent,
                 :_destroy
               ]

  # Callbacks
  before_save :set_published

  private

  def set_published
    self.published = false unless self.published.present?
  end
end
