class AddPeopleDatesToPeople < ActiveRecord::Migration[6.0]
  def change
    add_column :people, :artist_birth_date, :string
    add_column :people, :artist_death_date, :string
    add_column :people, :years_active, :string
  end
end
