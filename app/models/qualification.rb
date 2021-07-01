class Qualification < ApplicationRecord
  # Relationships
  belongs_to :value_list
  belongs_to :qualifiable, polymorphic: true

end
