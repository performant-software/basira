class Location < ApplicationRecord
  # Includes
  include Indexable
  include Recordable
  include Qualifiable

  attributes_to_index role: nil, description: nil, certainty: nil, note: nil

  # Relationships
  belongs_to :place
  belongs_to :locateable, polymorphic: true
end
