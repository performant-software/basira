class ValueListsSerializer < BaseSerializer
  index_attributes :table, :column, :value, :authorized_vocabulary, :url_database_value, :comment

  show_attributes :table, :column, :value, :authorized_vocabulary, :url_database_value, :comment
end
