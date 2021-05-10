class CreateArtworks < ActiveRecord::Migration[6.0]
  def up
    create_table :artworks do |t|
      t.string :date_descriptor
      t.date :date
      t.integer :height, null: false, default: 0
      t.integer :width, null: false, default: 0
      t.integer :depth, null: false, default: 0
      t.jsonb :notes, null: false, default: {}
      t.boolean :published, null: false, default: false
      t.string :repository_work_url
      t.string :accession_number

      t.integer :airtable_id
      t.timestamp :airtable_timestamp
      t.string :airtable_aws_url
      t.string :airtable_aws_filename

      t.timestamps
    end

    create_table :artwork_titles do |t|
      t.references :artwork, null: false, foreign_key: true, index: true
      t.string :title
      t.string :title_type
      t.boolean :primary, null: false, default: false
      t.jsonb :notes, null: false, default: {}

      t.timestamps
    end
  end

  def down
    drop_table :artworks
    drop_table :artwork_titles
  end
end
