class ParticipationsSerializer < BaseSerializer
  index_attributes :id, :person_id, :participateable_id, :participateable_type, :description, :certainty, :notes,
                   person: PeopleSerializer, participateable: FactorySerializer, qualifications: QualificationsSerializer
end
