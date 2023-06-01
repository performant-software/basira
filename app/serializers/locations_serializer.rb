class LocationsSerializer < BaseSerializer
  index_attributes :id, :locateable_id, :locateable_type, :description, :certainty, :notes,
                   locateable: FactorySerializer, qualifications: QualificationsSerializer
end
