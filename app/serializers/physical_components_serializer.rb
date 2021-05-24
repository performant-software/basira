class PhysicalComponentsSerializer < BaseSerializer
  # Includes
  include AttachableSerializer

  index_attributes :id, :name
  show_attributes :id, :artwork_id, :name, :height, :width, :depth, :notes
end
