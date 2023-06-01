class PeopleSerializer < BaseSerializer
  # Includes
  include LocateableSerializer

  index_attributes :id, :name, :display_name, :person_type, qualifications: QualificationsSerializer
  show_attributes :id, :name, :display_name, :person_type, :authorized_vocabulary, :url, :database_value,
                  :comment, :part_of, :same_as, :artist_birth_date, :artist_death_date, :years_active,
                  qualifications: QualificationsSerializer

  # For unauthenticated users, only display participations for artworks that are published
  show_attributes(:participations) do |person, current_user|
    serializer = ParticipationsSerializer.new(current_user)
    serialized = []

    person.participations.each do |participation|
      next if current_user.nil? && participation.participateable_type == 'Artwork' && !participation.participateable.published?

      serialized << serializer.render_index(participation)
    end

    serialized
  end
end
