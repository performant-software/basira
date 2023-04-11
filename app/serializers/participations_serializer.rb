class ParticipationsSerializer < BaseSerializer
  index_attributes :id, :person_id, :participateable_id, :participateable_type,
                   person: PeopleSerializer, participateable: FactorySerializer,
                   qualifications: QualificationsSerializer
end
