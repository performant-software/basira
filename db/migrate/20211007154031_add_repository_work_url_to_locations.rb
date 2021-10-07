class AddRepositoryWorkUrlToLocations < ActiveRecord::Migration[6.0]
  def up
    add_column :locations, :repository_work_url, :string
  end

  def down
    remove_column :locations, :repository_work_url
  end
end
