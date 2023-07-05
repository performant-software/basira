class ConvertParticipationsRolesToQualifications < ActiveRecord::Migration[6.0]
  def up
    # Roles
    execute <<-SQL.squish
      INSERT INTO value_lists (human_name, object, "group", created_at, updated_at)
      SELECT DISTINCT participations.role, 'Person', 'Participation Role', current_timestamp, current_timestamp
        FROM participations
    SQL

    execute <<-SQL.squish
      INSERT INTO qualifications (qualifiable_id, qualifiable_type, value_list_id)
      SELECT participations.id, 'ParticipationRole', value_lists.id
        FROM participations
        JOIN value_lists ON value_lists.object = 'Person'
                        AND value_lists.group = 'Participation Role'
                        AND value_lists.human_name = participations.role
    SQL

    # Subroles
    execute <<-SQL.squish
      INSERT INTO value_lists (human_name, object, "group", created_at, updated_at)
      SELECT DISTINCT participations.subrole, 'Person', 'Participation Subrole', current_timestamp, current_timestamp
        FROM participations
    SQL

    execute <<-SQL.squish
      INSERT INTO qualifications (qualifiable_id, qualifiable_type, value_list_id)
      SELECT participations.id, 'ParticipationSubrole', value_lists.id
        FROM participations
        JOIN value_lists ON value_lists.object = 'Person'
                        AND value_lists.group = 'Participation Subrole'
                        AND value_lists.human_name = participations.subrole
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
