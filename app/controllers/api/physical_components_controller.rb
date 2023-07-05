class Api::PhysicalComponentsController < Api::BaseController
  protected

  def base_query
    return super if current_user.present?

    PhysicalComponent
      .joins(:artwork)
      .where(artworks: { published: true })
  end
end
