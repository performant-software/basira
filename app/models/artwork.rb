class Artwork < ApplicationRecord
  # Includes
  include Attachable

  # Relationships
  has_many :artwork_titles, dependent: :destroy
  has_one :primary_title, -> { where(primary: true) }, class_name: 'ArtworkTitle'

  # Nested attributes
  accepts_nested_attributes_for :artwork_titles, allow_destroy: true

  # Resourceable attributes
  allow_params :date, :date_descriptor, :height, :width, :depth, :notes, :published, :repository_work_url, :accession_number,
               artwork_titles_attributes: [:id, :title, :title_type, :notes, :primary, :_destroy]

  # Attachable
  has_one_attached :image
end