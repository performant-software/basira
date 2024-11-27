# frozen_string_literal: true

class ResetDocumentsNumberSewingSupports < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL.squish
      UPDATE documents
         SET number_sewing_supports = 0
       WHERE number_sewing_supports IS NULL;
    SQL

  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
