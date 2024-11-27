# frozen_string_literal: true

class ResetDocumentsNumberFastenings < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL.squish
      UPDATE documents
         SET number_fastenings = 0
       WHERE number_fastenings IS NULL;
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
