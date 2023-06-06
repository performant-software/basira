module Search
  module Artwork
    extend ActiveSupport::Concern

    included do
      # Includes
      include Base

      # Search index attributes
      search_attribute :id
      search_attribute :date_start, facet: true
      search_attribute :date_end, facet: true
      search_attribute :date_descriptor
      search_attribute :object_work_type, object: 'Artwork', group: 'Object/Work Type', multiple: true, facet: true
      search_attribute :materials, object: 'Artwork', group: 'Materials', multiple: true, facet: true
      search_attribute :techniques, object: 'Artwork', group: 'Technique', multiple: true, facet: true

      search_attribute(:image_url) do
        primary_attachment&.thumbnail_url
      end

      search_attribute(:artwork_titles) do
        artwork_titles&.map{ |artwork_title| artwork_title.to_search_json }
      end

      search_attribute(:creators) do
        participations&.map{ |participation| participation.person.to_search_json }
      end

      search_attribute(:locations) do
        locations&.map{ |location| location.place.to_search_json }
      end
    end
  end
end
