class ConvertLocationRolesToQualifications < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL.squish
      INSERT INTO value_lists (human_name, object, "group", created_at, updated_at)
      SELECT DISTINCT locations.subrole, 'Location', 'Subrole', current_timestamp, current_timestamp
        FROM locations
    SQL

    execute <<-SQL.squish
      INSERT INTO qualifications (qualifiable_id, qualifiable_type, value_list_id)
      SELECT locations.id, 'Location', value_lists.id
        FROM locations
        JOIN value_lists ON value_lists.object = 'Location'
                        AND value_lists.group = 'Subrole'
                        AND value_lists.human_name = locations.subrole
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
