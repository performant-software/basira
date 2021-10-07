class Participation < ApplicationRecord
  # Includes
  include Recordable

  # Relationships
  belongs_to :person
  belongs_to :participateable, polymorphic: true
end
