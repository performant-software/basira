class Api::HomeController < Api::BaseController

  skip_before_action :authenticate_user!, only: :index

  per_page 6

  protected

  def base_query
    Artwork
      .joins(Artwork.primary_attachment_preload)
      .order(Arel.sql('RANDOM()'))
  end

end
