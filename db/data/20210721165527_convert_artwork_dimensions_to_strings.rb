class ConvertArtworkDimensionsToStrings < ActiveRecord::Migration[6.0]
  def up
    execute build_sql(:artworks, :height)
    execute build_sql(:artworks, :width)
    execute build_sql(:artworks, :depth)

    execute build_sql(:physical_components, :height)
    execute build_sql(:physical_components, :width)
    execute build_sql(:physical_components, :depth)

    execute build_sql(:visual_contexts, :height)
    execute build_sql(:visual_contexts, :width)
    execute build_sql(:visual_contexts, :depth)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end

  private

  def build_sql(table, column)
    <<-SQL.squish
      UPDATE #{table.to_s}
         SET #{column.to_s} = NULL
       WHERE #{column.to_s} = '0'
    SQL
  end
end
