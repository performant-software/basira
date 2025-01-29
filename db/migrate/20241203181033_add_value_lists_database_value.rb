class AddValueListsDatabaseValue < ActiveRecord::Migration[7.0]
  def change
    add_column :value_lists, :database_value, :string
  end
end
