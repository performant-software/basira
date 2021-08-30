class CreateLocationsOfFasteningsValueList < ActiveRecord::Migration[6.0]
  def up
    execute build_sql('Fore-Edge')
    execute build_sql('Head')
    execute build_sql('Tail')
    execute build_sql('Left-to-right')
    execute build_sql('Right-to-left')
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end

  private

  def build_sql(human_name)
    <<-SQL.squish
      INSERT INTO value_lists (object, "group", human_name, created_at, updated_at) VALUES ('Document', 'Location of Fastenings', '#{human_name}', current_timestamp, current_timestamp)
    SQL
  end
end
