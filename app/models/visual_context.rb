class VisualContext < ApplicationRecord
  # Includes
  include Attachable
  include Qualifiable

  # Relationships
  belongs_to :physical_component
  has_many :documents, dependent: :destroy

  # Resourceable parameters
  allow_params :physical_component_id, :name, :height, :width, :depth, :notes, :beta
  
end
