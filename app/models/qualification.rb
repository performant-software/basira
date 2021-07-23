class Qualification < ApplicationRecord
  # Relationships
  belongs_to :qualifiable, polymorphic: true
  belongs_to :value_list, counter_cache: true

  # Delegates
  delegate :group, to: :value_list, prefix: true
  delegate :object, to: :value_list, prefix: true
end
