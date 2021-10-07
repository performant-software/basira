class AddArtworkIdToDocuments < ActiveRecord::Migration[6.0]
  def change
    add_reference :documents, :artwork, foreign_key: true
  end
end
