class AddNumberDocumentsVisibleToArtworks < ActiveRecord::Migration[6.0]
  def change
    add_column :artworks, :number_documents_visible, :integer
  end
end
