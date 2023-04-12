class Place < ApplicationRecord
  # Includes
  include Recordable

  # Relationships
  has_many :locations, dependent: :destroy

  # Nested attributes
  accepts_nested_attributes_for :locations, allow_destroy: :true

  # Resourceable parameters
  allow_params :name, :place_type, :lat, :long, :city, :state, :country, :url, :database_value, :notes, :same_as,
               :part_of, locations_attributes: [:id, :locateable_id, :locateable_type, :description, :certainty,
                                                :notes, :_destroy, qualifications_attributes: [:id, :value_list_id, :notes, :persistent, :_destroy]]
end
