module Search
  module PhysicalComponent
    extend ActiveSupport::Concern

    included do
      # Includes
      include Base

      # Search index attributes
      search_attribute :name
      search_attribute :height
      search_attribute :width
      search_attribute :depth
      search_attribute :notes

      search_attribute(:image_url) do
        primary_attachment&.thumbnail_url
      end
    end
  end
end
