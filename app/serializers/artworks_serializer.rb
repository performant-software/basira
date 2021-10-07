class ArtworksSerializer < BaseSerializer
  # Includes
  include AttachableSerializer
  include LocateableSerializer
  include NestableSerializer

  index_attributes :id, :date_start, :date_end, :date_descriptor, :published, primary_title: [:id, :title, :title_type]

  show_attributes :id, :date_start, :date_end, :date_descriptor, :published, :height, :width, :depth,
                  :notes_external, :notes_internal, :repository_work_url, :accession_number,
                  :documents_count, :number_documents_visible,
                  artwork_titles: [:id, :title, :title_type, :notes, :primary],
                  participations: ParticipationsSerializer, qualifications: QualificationsSerializer

  nested_attributes :id, primary_title: [:id, :title, :title_type],
                    primary_attachment: [:id, :file_url, :primary, :thumbnail_url],
                    children: { physical_components: PhysicalComponentsSerializer }
end
