class ChangeDocumentsTextColumnsDefaultValue < ActiveRecord::Migration[7.0]
  def change
    change_column :documents, :text_columns, :integer, null: false, default: 0
  end
end
