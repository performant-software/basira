class QualificationsSerializer < BaseSerializer
  index_attributes :id, :qualifiable_id, :qualifiable_type, :notes, :persistent, :value_list_id,
                   :value_list_group, :value_list_object, :form_field, value_list: ValueListsSerializer
end
