class CreateDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :documents do |t|
      t.references :visual_context, null: false, foreign_key: true
      t.string :name
      t.string :notes
      t.string :sewing_supports_visible
      t.integer :number_sewing_supports
      t.integer :number_fastenings
      t.string :location_of_fastenings
      t.boolean :inscriptions_on_binding
      t.text :inscription_text
      t.boolean :endband_present
      t.boolean :uncut_fore_edges
      t.text :fore_edge_text
      t.integer :bookmarks_registers
      t.integer :text_columns
      t.boolean :ruling
      t.boolean :rubrication
      t.text :identity
      t.text :transcription

      t.string :airtable_id
      t.timestamp :airtable_timestamp

      t.timestamps
    end
  end
end
