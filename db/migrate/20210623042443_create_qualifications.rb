class CreateQualifications < ActiveRecord::Migration[6.0]
  def change
    create_table :qualifications do |t|
      t.references :qualifiable, polymorphic: true
      t.references :value_list
      t.json :notes
      t.boolean :persistent, null: false, default: false
    end
  end
end
