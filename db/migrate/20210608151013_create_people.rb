class CreatePeople < ActiveRecord::Migration[6.0]
  def change
    create_table :people do |t|
      t.string :name
      t.string :display_name
      t.string :person_type
      t.string :nationality
      t.string :authorized_vocabulary
      t.string :url
      t.string :database_value
      t.string :comment
      t.integer :part_of
      t.integer :same_as

      t.string :airtable_id
      t.timestamp :airtable_timestamp

      t.timestamps
    end
  end
end
