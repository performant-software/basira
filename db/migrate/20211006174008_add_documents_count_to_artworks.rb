class AddDocumentsCountToArtworks < ActiveRecord::Migration[6.0]
  def up
    add_column :artworks, :documents_count, :integer, default: 0, null: false
  end

  def down
    remove_column :artworks, :documents_count
  end
end
