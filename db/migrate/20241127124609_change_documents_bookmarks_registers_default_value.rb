class ChangeDocumentsBookmarksRegistersDefaultValue < ActiveRecord::Migration[7.0]
  def change
    change_column :documents, :bookmarks_registers, :integer, null: false, default: 0
  end
end
