class Api::ArtworksController < Api::BaseController
  # Includes
  include Api::Qualifiable

  # Search columns
  search_attributes 'artwork_titles.title', :date_descriptor, :notes_external, :notes_internal

  # Joins
  joins :primary_title, only: :index

  # Preloads
  preloads :primary_title, only: :index
  preloads Artwork.primary_attachment_preload, only: :index

  preloads :artwork_titles, only: :show
  preloads Artwork.attachments_preload, only: :show
  preloads locations: :place, only: :show
  preloads participations: :person, only: :show

  def nested
    # Nested list of relationships to preload
    preloads = [
      Artwork.primary_attachment_preload,
      physical_components: [
        PhysicalComponent.primary_attachment_preload,
        visual_contexts: [
          VisualContext.primary_attachment_preload,
          documents: Document.attachments_preload
        ]
      ]
    ]

    # Load the data
    artwork = Artwork
                .preload(preloads)
                .find(params[:id])

    # Serialize it
    serializer = serializer_class.new(current_user)
    render json: { param_name.to_sym  => serializer.render_nested(artwork) }
  end

  protected

  def apply_search(query)
    return query if params[:search].blank?

    artist_query = query.where(
      Participation
        .joins(:person)
        .where(Participation.arel_table[:participateable_id].eq(Artwork.arel_table[:id]))
        .where(participateable_type: 'Artwork')
        .where('people.name ILIKE ? OR people.display_name ILIKE ?', "%#{params[:search]}%", "%#{params[:search]}%")
        .arel.exists
    )

    super.or(artist_query)
  end
end
