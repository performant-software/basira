class QualificationsSerializer < BaseSerializer
  index_attributes :id, :qualifiable_id, :qualifiable_type, :group, :notes, :persistent, :value_list_id, value_list: ValueListsSerializer

  show_attributes :id, :qualifiable_id, :qualifiable_type, :group, :notes, :persistent, :value_list_id, value_list: ValueListsSerializer
end

def group
  self.value_list.group
end
