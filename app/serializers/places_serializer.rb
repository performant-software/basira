class PlacesSerializer < BaseSerializer
  index_attributes :id, :name, :place_type, :lat, :long, :city, :state, :country
  show_attributes :id, :name, :place_type, :lat, :long, :city, :state, :country, :url, :database_value, :notes, :same_as, :part_of

  # For unauthenticated users, only display locations for artworks that are published
  show_attributes(:locations) do |place, current_user|
    serializer = LocationsSerializer.new(current_user)
    serialized = []

    place.locations.each do |location|
      next if current_user.nil? && location.locateable_type == 'Artwork' && !location.locateable.published?

      serialized << serializer.render_index(location)
    end

    serialized
  end
end
