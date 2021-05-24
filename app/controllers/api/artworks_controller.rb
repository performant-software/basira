class Api::ArtworksController < Api::BaseController
  # Search columns
  search_attributes 'artwork_titles.title'

  # Joins
  joins :primary_title, only: :index

  # Preloads
  preloads :primary_title, only: :index
  preloads Artwork.primary_attachment_preload, only: :index

  preloads :artwork_titles, only: :show
  preloads Artwork.attachments_preload, only: :show

  def nested
    # Nested list of relationships to preload
    preloads = {
      physical_components: PhysicalComponent.attachments_preload
    }

    # Load the data
    artwork = Artwork
                .preload(preloads)
                .find(params[:id])

    # Serialize it
    serializer = serializer_class.new(current_user)
    render json: { param_name.to_sym  => serializer.render_nested(artwork) }
  end
end
