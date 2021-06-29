class SelectionsSerializer < BaseSerializer
  index_attributes :id, :column, :selectable_type, :selectable_id, :value_list_id, value_list: ValueListsSerializer

  show_attributes :id, :column, :selectable_type, :selectable_id, :value_list_id, value_list: ValueListsSerializer
end

  def column
    self.value_list.column
  end
