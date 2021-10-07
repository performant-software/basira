class PhysicalComponent < ApplicationRecord
  # Includes
  include Attachable
  include Recordable

  # Relationships
  belongs_to :artwork
  has_many :visual_contexts, dependent: :destroy

  # Resourceable parameters
  allow_params :artwork_id, :name, :height, :width, :depth, :notes
end
