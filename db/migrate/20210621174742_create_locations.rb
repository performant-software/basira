class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.references :place, null: false, foreign_key: true
      t.references :locateable, polymorphic: true, null: false
      t.string :role
      t.string :subrole
      t.text :description
      t.integer :certainty
      t.text :notes

      t.timestamps
    end
  end
end
