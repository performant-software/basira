class VisualContextsSerializer < BaseSerializer
  # Includes
  include AttachableSerializer
  include NestableSerializer

  index_attributes :id, :name, :created_by_id

  show_attributes :id, :physical_component_id, :name, :height, :width, :depth, :notes, :beta, :created_at, :updated_at,
                  :created_by_id, qualifications: QualificationsSerializer

  show_attributes(:artwork_id) { |visual_context| visual_context.physical_component&.artwork_id }

  nested_attributes :id, :physical_component_id, :name, :created_by_id,
                    primary_attachment: [:id, :file_url, :primary, :thumbnail_url],
                    children: { documents: DocumentsSerializer }
end
