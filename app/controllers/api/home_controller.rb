class Api::HomeController < Api::BaseController

  skip_before_action :authenticate_user!, only: :index

  protected

  def base_query
    Artwork
      .joins(Artwork.primary_attachment_preload)
      .order(Arel.sql('RANDOM()'))
      .limit(params[:limit])
  end

end
