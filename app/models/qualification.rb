class Qualification < ApplicationRecord
  # Relationships
  belongs_to :qualifiable, polymorphic: true
  belongs_to :value_list, counter_cache: true

  # Callbacks
  before_save :set_persistent

  # Delegates
  delegate :group, to: :value_list, prefix: true
  delegate :object, to: :value_list, prefix: true

  private

  def set_persistent
    self.persistent = false unless self.persistent.present?
  end
end
