class Action < ApplicationRecord
  # Includes
  include Qualifiable

  # Relationships
  belongs_to :document
  has_many :entity_qualifications, -> { joins(:value_list).merge(ValueList.entity_description) }, as: :qualifiable, class_name: 'Qualification'
  has_many :value_lists, through: :entity_qualifications
end
