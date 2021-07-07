class ChangeDocumentDefaultValues < ActiveRecord::Migration[6.0]
  def change
    change_column_default :documents, :sewing_supports_visible, false
    change_column_default :documents, :inscriptions_on_binding, false
    change_column_default :documents, :endband_present, false
    change_column_default :documents, :uncut_fore_edges, false
    change_column_default :documents, :bookmarks_registers, 0
    change_column_default :documents, :text_columns, 1
    change_column_default :documents, :ruling, false
    change_column_default :documents, :rubrication, false
  end
end
