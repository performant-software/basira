class Location < ApplicationRecord
  # Includes
  include Recordable
  include Qualifiable

  # Relationships
  belongs_to :place
  belongs_to :locateable, polymorphic: true
end
