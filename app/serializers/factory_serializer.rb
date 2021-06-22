class FactorySerializer < BaseSerializer

  def render_index(obj)
    if obj.is_a?(Artwork)
      serializer = ArtworksSerializer
    elsif obj.is_a?(Person)
      serializer = PeopleSerializer
    end

    serializer.new.render_index(obj)
  end

end
