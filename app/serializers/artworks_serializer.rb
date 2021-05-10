class ArtworksSerializer < BaseSerializer
  index_attributes :id, :date, :date_descriptor, :published, :image_url
  index_attributes(:title) { |artwork| artwork.primary_title.title }

  show_attributes :id, :date, :date_descriptor, :published, :image_url, :height, :width, :depth, :notes,
                  :repository_work_url, :accession_number, artwork_titles: [:id, :title, :title_type, :notes, :primary]
end
