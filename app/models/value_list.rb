class ValueList < ApplicationRecord
  # Includes
  include Recordable

  # Relationships
  has_many :qualifications

  # Resource params
  allow_params :authorized_vocabulary, :comment, :object, :group, :human_name, :url_database_value

  # Scopes
  scope :entity_description, -> { where(object: 'Action', group: 'Characteristic') }
end
