class ActionsSerializer < BaseSerializer
  index_attributes :id, value_lists: ValueListsSerializer
end
