class PhysicalComponent < ApplicationRecord
  # Includes
  include Attachable

  # Relationships
  belongs_to :artwork

  # Resourceable parameters
  allow_params :artwork_id, :name, :height, :width, :depth, :notes
end
