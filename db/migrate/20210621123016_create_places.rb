class CreatePlaces < ActiveRecord::Migration[6.0]
  def change
    create_table :places do |t|
      t.string :name
      t.string :place_type
      t.float :lat
      t.float :long
      t.string :city
      t.string :state
      t.string :country
      t.string :url
      t.string :database_value
      t.text :notes
      t.integer :same_as
      t.integer :part_of

      t.string :airtable_id
      t.timestamp :airtable_timestamp

      t.timestamps
    end
  end
end
