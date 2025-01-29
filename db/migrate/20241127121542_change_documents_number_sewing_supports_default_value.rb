class ChangeDocumentsNumberSewingSupportsDefaultValue < ActiveRecord::Migration[7.0]
  def change
    change_column :documents, :number_sewing_supports, :integer, null: false, default: 0
  end
end
