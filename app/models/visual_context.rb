class VisualContext < ApplicationRecord
  # Includes
  include Attachable

  # Relationships
  belongs_to :physical_component

  # Resourceable parameters
  allow_params :physical_component_id, :name, :height, :width, :depth, :notes
end
