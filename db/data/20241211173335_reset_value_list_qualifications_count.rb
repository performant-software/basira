# frozen_string_literal: true

class ResetValueListQualificationsCount < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL.squish
      WITH qualification_counts AS (
        SELECT qualifications.value_list_id, COUNT(*) AS qualifications_count
          FROM qualifications
         GROUP BY qualifications.value_list_id
      )
      UPDATE value_lists
         SET qualifications_count = qualification_counts.qualifications_count
        FROM qualification_counts
       WHERE qualification_counts.value_list_id = value_lists.id
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
