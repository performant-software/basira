class VisualContext < ApplicationRecord
  # Includes
  include Attachable

  # Relationships
  belongs_to :physical_component
  has_many :documents, dependent: :destroy
  has_many :qualifications, as: :qualifiable
  has_many :value_lists, through: :qualifications, as: :qualifiable

  # Resourceable parameters
  allow_params :physical_component_id, :name, :height, :width, :depth, :notes,
  qualifications_attributes: [
    :id,
    :qualifiable_id,
    :qualifiable_type,
    :value_list_id,
    :notes,
    :persistent,
    :_destroy
  ]
end
