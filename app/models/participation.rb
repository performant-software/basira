class Participation < ApplicationRecord
  # Includes
  include Indexable
  include Recordable
  include Qualifiable

  # Relationships
  belongs_to :person
  belongs_to :participateable, polymorphic: true

  attributes_to_index description: nil, certainty: nil, notes: nil
end
