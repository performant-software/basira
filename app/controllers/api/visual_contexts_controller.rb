class Api::VisualContextsController < Api::BaseController
  protected

  def base_query
    return super if current_user.present?

    VisualContext
      .joins(physical_component: :artwork)
      .where(artworks: { published: true })
  end
end
