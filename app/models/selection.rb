class Selection < ApplicationRecord
  # Relationships
  belongs_to :value_list
  belongs_to :selectable, polymorphic: true

end
