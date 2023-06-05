module Search
  module VisualContext
    extend ActiveSupport::Concern

    included do
      # Includes
      include Base

      # Search index attributes
      search_attribute :name
      search_attribute :height
      search_attribute :width
      search_attribute :depth
      search_attribute :general_subject, object: 'Visual Context', group: 'General Subject/Genre', multiple: true, facet: true
      search_attribute :subject_cultural_context, object: 'Visual Context', group: 'Subject Cultural Context', multiple: true, facet: true
      search_attribute :specific_subject, object: 'Visual Context', group: 'Specific Subject/Iconography', multiple: true, facet: true
      search_attribute :beta, facet: true
      search_attribute :notes

      search_attribute(:image_url) do
        primary_attachment&.thumbnail_url
      end
    end
  end
end
