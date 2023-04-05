class ConvertArtworkTitleTypesToQualifications < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL.squish
      INSERT INTO value_lists (human_name, object, "group", created_at, updated_at)
      SELECT DISTINCT artwork_titles.title_type, 'Artwork', 'Title Type', current_timestamp, current_timestamp
        FROM artwork_titles
    SQL

    execute <<-SQL.squish
      INSERT INTO qualifications (qualifiable_id, qualifiable_type, value_list_id)
      SELECT artwork_titles.id, 'ArtworkTitle', value_lists.id
        FROM artwork_titles
        JOIN value_lists ON value_lists.object = 'Artwork'
                        AND value_lists.group = 'Title Type'
                        AND value_lists.human_name = artwork_titles.title_type
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
