class CreateSelection < ActiveRecord::Migration[6.0]
  def change
    create_table :selections do |t|
      t.references :selectable, polymorphic: true
      t.references :value_list
    end
  end
end
