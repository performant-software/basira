class PhysicalComponent < ApplicationRecord
  # Includes
  include Attachable
  include Indexable
  include Recordable

  # Relationships
  belongs_to :artwork
  has_many :visual_contexts, dependent: :destroy

  attributes_to_index name: :tesi, height: :ssi, width: :ssi, depth: :ssi, notes: :tesi

  # Resourceable parameters
  allow_params :artwork_id, :name, :height, :width, :depth, :notes
end
