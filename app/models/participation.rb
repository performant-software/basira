class Participation < ApplicationRecord
  # Includes
  include Recordable
  include Qualifiable

  # Relationships
  belongs_to :person
  belongs_to :participateable, polymorphic: true
end
