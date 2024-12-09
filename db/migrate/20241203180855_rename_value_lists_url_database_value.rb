class RenameValueListsUrlDatabaseValue < ActiveRecord::Migration[7.0]
  def change
    rename_column :value_lists, :url_database_value, :authorized_vocabulary_url
  end
end
