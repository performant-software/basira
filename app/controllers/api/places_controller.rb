class Api::PlacesController < Api::BaseController
  # Search attributes
  search_attributes :name, :city, :state, :country

  # Preloads
  preloads :qualifications, only: :show
end
