class CreateActions < ActiveRecord::Migration[6.0]
  def change
    create_table :actions do |t|
      t.references :document, null: false, foreign_key: true
      t.text :notes

      t.timestamps
    end
  end
end
