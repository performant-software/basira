class ChangeColumnType < ActiveRecord::Migration[6.0]
  def up
    change_column_default :documents, :sewing_supports_visible, from: "f", to: nil
    change_column :documents, :sewing_supports_visible, :boolean, using: 'sewing_supports_visible::boolean'
    change_column_default :documents, :sewing_supports_visible, from: nil, to: false
  end

  def down
    change_column_default :documents, :sewing_supports_visible, from: false, to: nil
    change_column :documents, :sewing_supports_visible, :string
    change_column_default :documents, :sewing_supports_visible, from: nil, to: "f"
  end
end
