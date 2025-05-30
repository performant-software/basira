class ArtworksSerializer < BaseSerializer
  # Includes
  include AttachableSerializer
  include LocateableSerializer
  include NestableSerializer

  index_attributes :id, :date_start, :date_end, :date_descriptor, :published, :created_at, :updated_at, :created_by_id,
                    primary_title: [:id, :title, qualifications: QualificationsSerializer],
                    updated_by: UsersSerializer, created_by: UsersSerializer

  show_attributes :id, :date_start, :date_end, :date_descriptor, :published, :height, :width, :depth,
                  :notes_external, :notes_internal, :repository_work_url, :accession_number,
                  :documents_count, :number_documents_visible, :created_at, :updated_at, :created_by_id,
                  artwork_titles: [:id, :title, :notes, :primary, qualifications: QualificationsSerializer],
                  updated_by: UsersSerializer, created_by: UsersSerializer,
                  participations: ParticipationsSerializer, qualifications: QualificationsSerializer

  nested_attributes :id, :created_by_id, primary_title: [:id, :title, qualifications: QualificationsSerializer],
                    primary_attachment: [:id, :file_url, :primary, :thumbnail_url],
                    children: { physical_components: PhysicalComponentsSerializer }
end
