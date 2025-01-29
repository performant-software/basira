# frozen_string_literal: true

class ResetDocumentsBookmarksRegisters < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL.squish
      UPDATE documents
         SET bookmarks_registers = 0
       WHERE bookmarks_registers IS NULL;
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
