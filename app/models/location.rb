class Location < ApplicationRecord
  # Includes
  include Recordable

  # Relationships
  belongs_to :place
  belongs_to :locateable, polymorphic: true
end
