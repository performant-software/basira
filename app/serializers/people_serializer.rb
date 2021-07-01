class PeopleSerializer < BaseSerializer
  # Includes
  include LocateableSerializer

  index_attributes :id, :name, :display_name, :person_type, :nationality
  show_attributes :id, :name, :display_name, :person_type, :nationality, :authorized_vocabulary, :url, :database_value,
                  :comment, :part_of, :same_as, participations: ParticipationsSerializer
end
