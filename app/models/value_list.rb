class ValueList < ApplicationRecord
  # Includes
  include Qualifiable
  include Recordable

  # Resource params
  allow_params :authorized_vocabulary, :comment, :object, :group, :human_name, :authorized_vocabulary_url, :database_value

  # Scopes
  scope :entity_description, -> { where(object: 'Action', group: 'Characteristic') }
end
