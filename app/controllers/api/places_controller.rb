class Api::PlacesController < Api::BaseController
  search_attributes :name, :city, :state, :country
end
