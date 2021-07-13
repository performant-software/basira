class ValueList < ApplicationRecord
  # Relationships
  has_many :qualifications
  has_many :qualifiables, through: :qualifications

  # Resource params
  allow_params :authorized_vocabulary, :comment, :object, :group, :human_name, :url_database_value

end
