class AddFieldsToArtworks < ActiveRecord::Migration[6.0]
  def change
    add_column :artworks, :commissioning_contexts, :jsonb, array: true, default: []
    add_column :artworks, :materials, :jsonb, array: true, default: []
    add_column :artworks, :object_work_types, :jsonb, array: true, default: []
    add_column :artworks, :techniques, :jsonb, array: true, default: []
  end
end
