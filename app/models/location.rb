class Location < ApplicationRecord
  belongs_to :place
  belongs_to :locateable, polymorphic: true
end
