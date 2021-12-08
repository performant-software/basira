class RemoveNationalityFromPeople < ActiveRecord::Migration[6.0]
  def up
    remove_column :people, :nationality
  end

  def down
    add_column :people, :nationality, :string
  end
end
