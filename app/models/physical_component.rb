class PhysicalComponent < ApplicationRecord
  # Includes
  include Attachable

  # Relationships
  belongs_to :artwork

  # Resourceable parameters
  allow_params :name, :height, :width, :depth
end
