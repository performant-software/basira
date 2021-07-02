class ValueListsSerializer < BaseSerializer
  index_attributes :id, :object, :group, :human_name, :url_database_value, :authorized_vocabulary,
                   :comment, :qualifications_count

  show_attributes :id, :object, :group, :human_name, :url_database_value, :authorized_vocabulary,
                  :comment, :qualifications_count
end
