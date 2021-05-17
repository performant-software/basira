class CreateAttachments < ActiveRecord::Migration[6.0]
  def up
    create_table :attachments do |t|
      t.references :attachable, polymorphic: true, null: false, index: true
      t.boolean :primary, null: false, default: false

      t.integer :airtable_id
      t.timestamp :airtable_timestamp

      t.timestamps
    end
  end

  def down
    drop_table :attachments
  end
end
