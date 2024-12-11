# frozen_string_literal: true

class CreateAuthorizedVocabularyValueLists < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL.squish
      INSERT INTO value_lists (object, "group", human_name, created_at, updated_at)
      SELECT DISTINCT 'General', 'Authorized Vocabulary', authorized_vocabulary, current_timestamp, current_timestamp
        FROM value_lists
       WHERE authorized_vocabulary IS NOT NULL
       UNION
      SELECT DISTINCT 'General', 'Authorized Vocabulary', authorized_vocabulary, current_timestamp, current_timestamp
        FROM people
       WHERE authorized_vocabulary IS NOT NULL
       ORDER BY authorized_vocabulary
    SQL

    execute <<-SQL.squish
      INSERT INTO qualifications (qualifiable_id, qualifiable_type, value_list_id)
      SELECT value_lists.id, 'ValueList', v.id
        FROM value_lists
        JOIN value_lists v ON v.human_name = value_lists.authorized_vocabulary
                          AND v.object = 'General'
                          AND v.group = 'Authorized Vocabulary'
       WHERE value_lists.authorized_vocabulary IS NOT NULL
    SQL

    execute <<-SQL.squish
      INSERT INTO qualifications (qualifiable_id, qualifiable_type, value_list_id)
      SELECT people.id, 'Person', value_lists.id
        FROM people
        JOIN value_lists ON value_lists.human_name = people.authorized_vocabulary
                        AND value_lists.object = 'General'
                        AND value_lists.group = 'Authorized Vocabulary'
       WHERE people.authorized_vocabulary IS NOT NULL
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
