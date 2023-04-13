class Action < ApplicationRecord
  # Includes
  include Indexable
  include Qualifiable
  include Recordable

  # Relationships
  belongs_to :document
  has_many :entity_qualifications, -> { joins(:value_list).merge(ValueList.entity_description) }, as: :qualifiable, class_name: 'Qualification'
  has_many :value_lists, through: :entity_qualifications

  attributes_to_index notes: nil
end
