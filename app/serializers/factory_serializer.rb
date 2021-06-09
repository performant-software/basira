class FactorySerializer < BaseSerializer

  def render_index(obj)
    if obj.is_a?(Artwork)
      serializer = ArtworksSerializer
    end

    serializer.new.render_index(obj)
  end

end
