class Qualification < ApplicationRecord
  # Relationships
  belongs_to :qualifiable, polymorphic: true
  belongs_to :value_list, counter_cache: true

  # Delegates
  delegate :group, to: :value_list, prefix: true
  delegate :object, to: :value_list, prefix: true

  # Validations
  validate :validate_value_list

  private

  def validate_value_list
    if value_list_id == qualifiable_id && qualifiable_type == ValueList.to_s
      errors.add(:value_list_id, I18n.t('errors.qualification.self_reference'))
    end
  end
end
