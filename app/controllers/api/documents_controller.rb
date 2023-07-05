class Api::DocumentsController < Api::BaseController
  protected

  def base_query
    return super if current_user.present?

    Document
      .joins(visual_context: [physical_component: :artwork])
      .where(visual_context: { physical_component: { artworks: { published: true } } })
  end
end
