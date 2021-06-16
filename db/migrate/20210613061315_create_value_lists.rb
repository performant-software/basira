class CreateValueLists < ActiveRecord::Migration[6.0]
  def change
    create_table :value_lists do |t|
      t.string :table
      t.string :column
      t.string :value
      t.string :authorized_vocabulary
      t.string :url_database_value
      t.string :comment
      t.string :airtable_id
      t.datetime :airtable_timestamp

      t.timestamps
    end
  end
end
