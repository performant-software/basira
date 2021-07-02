class AddQualificationsCountToValueLists < ActiveRecord::Migration[6.0]
  def up
    add_column :value_lists, :qualifications_count, :integer, null: false, default: 0
  end

  def down
    remove_column :value_lists, :qualifications_count
  end
end
