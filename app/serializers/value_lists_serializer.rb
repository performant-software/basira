class ValueListsSerializer < BaseSerializer
  index_attributes :id, :object, :group, :human_name, :authorized_vocabulary, :authorized_vocabulary_url,
                   :database_value, :comment, :qualifications_count

  show_attributes :id, :object, :group, :human_name, :authorized_vocabulary, :authorized_vocabulary_url,
                  :database_value, :comment, :qualifications_count
end
