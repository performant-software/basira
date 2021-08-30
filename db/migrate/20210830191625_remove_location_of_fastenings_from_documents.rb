class RemoveLocationOfFasteningsFromDocuments < ActiveRecord::Migration[6.0]
  def up
    remove_column :documents, :location_of_fastenings
  end

  def down
    add_column :documents, :location_of_fastenings, :string
  end
end
