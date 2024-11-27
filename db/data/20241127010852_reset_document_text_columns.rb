# frozen_string_literal: true

class ResetDocumentTextColumns < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL.squish
      UPDATE documents
         SET text_columns = 0
       WHERE text_columns IS NULL
          OR text_columns = 1;
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
