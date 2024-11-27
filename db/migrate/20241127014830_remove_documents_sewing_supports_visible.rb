class RemoveDocumentsSewingSupportsVisible < ActiveRecord::Migration[7.0]
  def change
    remove_column :documents, :sewing_supports_visible
  end
end
