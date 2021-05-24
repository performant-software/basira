class CreatePhysicalComponents < ActiveRecord::Migration[6.0]
  def change
    create_table :physical_components do |t|
      t.references :artwork, null: false, foreign_key: true
      t.string :name
      t.integer :height
      t.integer :width
      t.integer :depth
      t.string :notes

      t.string :airtable_id
      t.timestamp :airtable_timestamp

      t.timestamps
    end
  end
end
