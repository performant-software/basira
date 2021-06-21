class Place < ApplicationRecord
  # Resourceable parameters
  allow_params :name, :place_type, :lat, :long, :city, :state, :country, :url, :database_value, :notes, :same_as, :part_of
end
