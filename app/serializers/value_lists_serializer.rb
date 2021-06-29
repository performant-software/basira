class ValueListsSerializer < BaseSerializer
  index_attributes :id, :table, :column, :column_readable, :value, :authorized_vocabulary, :url_database_value, :comment, :linked_records_count

  show_attributes :id, :table, :column, :column_readable, :value, :authorized_vocabulary, :url_database_value, :comment
end

def linked_records_count
  self.selections.count
end
