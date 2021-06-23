class ParticipationsSerializer < BaseSerializer
  index_attributes :id, :person_id, :participateable_id, :participateable_type, :role, :subrole,
                   person: PeopleSerializer, participateable: FactorySerializer
end
