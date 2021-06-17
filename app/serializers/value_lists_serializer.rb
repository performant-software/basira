class ValueListsSerializer < BaseSerializer
  index_attributes :id, :table, :column, :value, :authorized_vocabulary, :url_database_value, :comment

  show_attributes :id, :table, :column, :value, :authorized_vocabulary, :url_database_value, :comment
end
