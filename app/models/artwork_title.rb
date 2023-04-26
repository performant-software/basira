class ArtworkTitle < ApplicationRecord
  include Indexable
  include Qualifiable

  belongs_to :artwork

  attributes_to_index title: nil, title_type: nil, notes: nil
end
