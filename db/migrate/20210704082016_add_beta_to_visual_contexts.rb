class AddBetaToVisualContexts < ActiveRecord::Migration[6.0]
  def change
    add_column :visual_contexts, :beta, :boolean, default: false, null: false
  end
end
