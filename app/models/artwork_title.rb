class ArtworkTitle < ApplicationRecord
  # Includes
  include Qualifiable
  include Search::ArtworkTitle

  # Relationships
  belongs_to :artwork
end
