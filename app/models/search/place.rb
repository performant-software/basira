module Search
  module Place
    extend ActiveSupport::Concern

    included do
      # Includes
      include Base

      # Search index attributes
      search_attribute :name, facet: true
      search_attribute :place_type, facet: true
      search_attribute :city, facet: true
      search_attribute :state, facet: true
      search_attribute :country, facet: true
      search_attribute :url
      search_attribute :notes
    end
  end
end
