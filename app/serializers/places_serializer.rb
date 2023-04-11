class PlacesSerializer < BaseSerializer
  index_attributes :id, :name, :place_type, :lat, :long, :city, :state, :country

  show_attributes :id, :name, :place_type, :lat, :long, :city, :state, :country, :url, :database_value, :notes,
                   :same_as, :part_of, locations: [:id, :locateable_id, :locateable_type, :description,
                                                   :certainty, :notes, locateable: FactorySerializer, qualifications: QualificationsSerializer]
end
