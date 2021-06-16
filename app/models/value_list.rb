class ValueList < ApplicationRecord

  # Resource params
  allow_params :table, :column, :value, :authorized_vocabulary, :url_database_value, :comment

end
