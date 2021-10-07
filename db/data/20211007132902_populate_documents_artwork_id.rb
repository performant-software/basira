class PopulateDocumentsArtworkId < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL.squish
      WITH documents_artwork AS (
        SELECT d.id AS d_id, a.id AS a_id
        FROM documents AS d
          INNER JOIN visual_contexts ON visual_contexts.id = d.visual_context_id 
          INNER JOIN physical_components ON physical_components.id = visual_contexts.physical_component_id 
          INNER JOIN artworks a ON a.id = physical_components.artwork_id
      )
      UPDATE documents
      SET artwork_id = documents_artwork.a_id
      FROM documents_artwork
      WHERE id = documents_artwork.d_id;
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
