class ChangeBooleanColumnsToNonNull < ActiveRecord::Migration[6.0]
  def change
    change_column_null :documents, :inscriptions_on_binding, false, false
    change_column_null :documents, :endband_present, false, false
    change_column_null :documents, :uncut_fore_edges, false, false
    change_column_null :documents, :ruling, false, false
    change_column_null :documents, :rubrication, false, false
  end
end
