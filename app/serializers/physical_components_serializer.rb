class PhysicalComponentsSerializer < BaseSerializer
  # Includes
  include AttachableSerializer
  include NestableSerializer

  index_attributes :id, :name, :created_by_id

  show_attributes :id, :artwork_id, :name, :height, :width, :depth, :notes, :created_at, :updated_at, :created_by_id

  nested_attributes :id, :artwork_id, :name, :created_by_id,
                    primary_attachment: [:id, :file_url, :primary, :thumbnail_url],
                    children: { visual_contexts: VisualContextsSerializer }
end
