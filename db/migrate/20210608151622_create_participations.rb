class CreateParticipations < ActiveRecord::Migration[6.0]
  def change
    create_table :participations do |t|
      t.references :person, null: false, foreign_key: true
      t.references :participateable, polymorphic: true, null: false, index: { name: :index_participations_participateable_type_and_id }
      t.string :role
      t.string :subrole
      t.text :description
      t.integer :certainty
      t.text :notes

      t.timestamps
    end
  end
end
