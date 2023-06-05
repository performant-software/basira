module Search
  module ArtworkTitle
    extend ActiveSupport::Concern

    included do
      # Includes
      include Base

      # Search index attributes
      search_attribute :title
      search_attribute :primary
      search_attribute :notes
      search_attribute :title_type, object: 'Artwork Title', group: 'Title Type', multiple: true, facet: true
    end
  end
end
