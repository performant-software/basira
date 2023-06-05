module Search
  module Action
    extend ActiveSupport::Concern

    included do
      # Includes
      include Base

      # Search index attributes
      search_attribute :verb, object: 'Document', group: 'Action', facet: true
      search_attribute :entity, object: 'Action', group: 'Entity', facet: true
      search_attribute :entity_descriptors, object: 'Action', group: 'Characteristic', multiple: true, facet: true
      search_attribute :body_descriptors, object: 'Action', group: 'Body', multiple: true, facet: true
      search_attribute :notes
    end
  end
end
