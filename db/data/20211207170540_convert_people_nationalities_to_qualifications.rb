class ConvertPeopleNationalitiesToQualifications < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL.squish
      INSERT INTO qualifications (qualifiable_id, qualifiable_type, value_list_id)
      SELECT people.id, 'Person', value_lists.id
        FROM people
        JOIN value_lists ON value_lists.object = 'Person'
                        AND value_lists.group = 'Nationality'
                        AND value_lists.human_name = people.nationality
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
