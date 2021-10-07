class PopulateArtworkDocumentsCount < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL.squish
      WITH artwork_documents_count AS (
        SELECT artworks.id AS a_id, count(*) AS doc_count 
        FROM artworks
          INNER JOIN documents on documents.artwork_id = artworks.id
          GROUP BY artworks.id
      )
      UPDATE artworks
      SET documents_count = artwork_documents_count.doc_count
      FROM artwork_documents_count
      WHERE id = artwork_documents_count.a_id;
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
