class ConvertArtworkDimensionsToStrings < ActiveRecord::Migration[6.0]
  def change
    change_column :artworks, :height, :string, null: true, default: nil
    change_column :artworks, :width, :string, null: true, default: nil
    change_column :artworks, :depth, :string, null: true, default: nil

    change_column :physical_components, :height, :string, null: true, default: nil
    change_column :physical_components, :width, :string, null: true, default: nil
    change_column :physical_components, :depth, :string, null: true, default: nil

    change_column :visual_contexts, :height, :string, null: true, default: nil
    change_column :visual_contexts, :width, :string, null: true, default: nil
    change_column :visual_contexts, :depth, :string, null: true, default: nil
  end
end
