class CreateValueLists < ActiveRecord::Migration[6.0]
  def change
    create_table :value_lists do |t|
      t.string :object
      t.string :group
      t.string :human_name
      t.string :url_database_value
      t.json :comment
      t.string :authorized_vocabulary
      t.string :airtable_id
      t.datetime :airtable_timestamp

      t.timestamps
    end
  end
end
