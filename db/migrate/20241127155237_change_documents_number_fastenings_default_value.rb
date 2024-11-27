class ChangeDocumentsNumberFasteningsDefaultValue < ActiveRecord::Migration[7.0]
  def change
    change_column :documents, :number_fastenings, :integer, null: false, default: 0
  end
end
