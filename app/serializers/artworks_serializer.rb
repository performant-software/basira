class ArtworksSerializer < BaseSerializer
  # Includes
  include AttachableSerializer
  include NestableSerializer

  index_attributes :id, :date_start, :date_end, :date_descriptor, :published, :value_lists, :materials, :techniques, :object_work_types, :commissioning_contexts, primary_title: [:id, :title, :title_type], selections: SelectionsSerializer

  show_attributes :id, :date_start, :date_end, :date_descriptor, :published, :height, :width, :depth,
                  :notes_external, :notes_internal, :repository_work_url, :accession_number,
                  :value_lists, :materials, :techniques, :object_work_types, :commissioning_contexts, artwork_titles: [:id, :title, :title_type, :notes, :primary],
                  selections: SelectionsSerializer

  nested_attributes :id, primary_title: [:id, :title, :title_type],
                    primary_attachment: [:id, :file_url, :primary, :thumbnail_url],
                    children: { physical_components: PhysicalComponentsSerializer }
end
