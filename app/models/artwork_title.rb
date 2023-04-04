class ArtworkTitle < ApplicationRecord
  include Qualifiable

  belongs_to :artwork
end
