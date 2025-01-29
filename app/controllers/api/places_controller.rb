class Api::PlacesController < Api::BaseController
  # Search attributes
  search_attributes :name, :city, :state, :country

  # Preloads
  preloads :qualifications, only: :show

  # Actions
  skip_before_action :authenticate_user!, only: :index
end
