module Search
  module Person
    extend ActiveSupport::Concern

    included do
      # Includes
      include Base

      # Search index attributes
      search_attribute :name
      search_attribute :display_name, facet: true
      search_attribute :nationality, object: 'Person', group: 'Nationality', facet: true
    end
  end
end
