class Artwork < ApplicationRecord
  # Includes
  include Attachable
  include Locateable
  include Participateable
  include Qualifiable
  include Recordable
  include Search::Artwork

  # Relationships
  has_many :artwork_titles, dependent: :destroy
  has_many :physical_components, dependent: :destroy
  has_many :documents
  has_one :primary_title, -> { where(primary: true) }, class_name: 'ArtworkTitle'
  belongs_to :created_by, class_name: 'User', optional: true
  belongs_to :updated_by, class_name: 'User', optional: true

  # Nested attributes
  accepts_nested_attributes_for :artwork_titles, allow_destroy: true

  # Resourceable attributes
  allow_params :date_start, :date_end, :date_descriptor, :height, :width, :depth, :notes_external, :notes_internal,
               :published, :repository_work_url, :accession_number, :number_documents_visible, images: [],
                artwork_titles_attributes: [:id, :title, :notes, :primary, :_destroy,
                qualifications_attributes: [:id, :value_list_id, :notes, :persistent, :_destroy]]
end
