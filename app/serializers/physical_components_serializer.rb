class PhysicalComponentsSerializer < BaseSerializer
  # Includes
  include AttachableSerializer
  include NestableSerializer

  index_attributes :id, :name
  show_attributes :id, :artwork_id, :name, :height, :width, :depth, :notes
  nested_attributes :id, :artwork_id, :name, primary_attachment: [:id, :file_url, :primary, :thumbnail_url]
end
