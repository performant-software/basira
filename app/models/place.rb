class Place < ApplicationRecord
  # Relationships
  has_many :locations, dependent: :destroy

  # Nested attributes
  accepts_nested_attributes_for :locations, allow_destroy: :true

  # Resourceable parameters
  allow_params :name, :place_type, :lat, :long, :city, :state, :country, :url, :database_value, :notes, :same_as,
               :part_of, locations_attributes: [:id, :locateable_id, :locateable_type, :role, :subrole, :description, :certainty, :notes, :_destroy]
end
