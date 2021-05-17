class ArtworksSerializer < BaseSerializer
  # Includes
  include AttachableSerializer
  include Rails.application.routes.url_helpers

  index_attributes :id, :date_start, :date_end, :date_descriptor, :published, primary_title: [:id, :title, :title_type]

  show_attributes :id, :date_start, :date_end, :date_descriptor, :published, :height, :width, :depth,
                  :notes_external, :notes_internal, :repository_work_url, :accession_number,
                  artwork_titles: [:id, :title, :title_type, :notes, :primary]
end
