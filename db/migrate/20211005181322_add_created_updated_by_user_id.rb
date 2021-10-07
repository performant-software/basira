class AddCreatedUpdatedByUserId < ActiveRecord::Migration[6.0]
  def up
    add_reference :artworks, :created_by, index: true, foreign_key: { to_table: :users }
    add_reference :artwork_titles, :created_by, index: true, foreign_key: { to_table: :users }
    add_reference :attachments, :created_by, index: true, foreign_key: { to_table: :users }
    add_reference :documents, :created_by, index: true, foreign_key: { to_table: :users }
    add_reference :locations, :created_by, index: true, foreign_key: { to_table: :users }
    add_reference :participations, :created_by, index: true, foreign_key: { to_table: :users }
    add_reference :people, :created_by, index: true, foreign_key: { to_table: :users }
    add_reference :physical_components, :created_by, index: true, foreign_key: { to_table: :users }
    add_reference :places, :created_by, index: true, foreign_key: { to_table: :users }
    add_reference :value_lists, :created_by, index: true, foreign_key: { to_table: :users }
    add_reference :visual_contexts, :created_by, index: true, foreign_key: { to_table: :users }

    add_reference :artworks, :updated_by, index: true, foreign_key: { to_table: :users }
    add_reference :artwork_titles, :updated_by, index: true, foreign_key: { to_table: :users }
    add_reference :attachments, :updated_by, index: true, foreign_key: { to_table: :users }
    add_reference :documents, :updated_by, index: true, foreign_key: { to_table: :users }
    add_reference :locations, :updated_by, index: true, foreign_key: { to_table: :users }
    add_reference :participations, :updated_by, index: true, foreign_key: { to_table: :users }
    add_reference :people, :updated_by, index: true, foreign_key: { to_table: :users }
    add_reference :physical_components, :updated_by, index: true, foreign_key: { to_table: :users }
    add_reference :places, :updated_by, index: true, foreign_key: { to_table: :users }
    add_reference :value_lists, :updated_by, index: true, foreign_key: { to_table: :users }
    add_reference :visual_contexts, :updated_by, index: true, foreign_key: { to_table: :users }
  end

  def down
    remove_reference :artworks, :created_by, index: true, foreign_key: { to_table: :users }
    remove_reference :artwork_titles, :created_by, index: true, foreign_key: { to_table: :users }
    remove_reference :attachments, :created_by, index: true, foreign_key: { to_table: :users }
    remove_reference :documents, :created_by, index: true, foreign_key: { to_table: :users }
    remove_reference :locations, :created_by, index: true, foreign_key: { to_table: :users }
    remove_reference :participations, :created_by, index: true, foreign_key: { to_table: :users }
    remove_reference :people, :created_by, index: true, foreign_key: { to_table: :users }
    remove_reference :physical_components, :created_by, index: true, foreign_key: { to_table: :users }
    remove_reference :places, :created_by, index: true, foreign_key: { to_table: :users }
    remove_reference :value_lists, :created_by, index: true, foreign_key: { to_table: :users }
    remove_reference :visual_contexts, :created_by, index: true, foreign_key: { to_table: :users }

    remove_reference :artworks, :updated_by, index: true, foreign_key: { to_table: :users }
    remove_reference :artwork_titles, :updated_by, index: true, foreign_key: { to_table: :users }
    remove_reference :attachments, :updated_by, index: true, foreign_key: { to_table: :users }
    remove_reference :documents, :updated_by, index: true, foreign_key: { to_table: :users }
    remove_reference :locations, :updated_by, index: true, foreign_key: { to_table: :users }
    remove_reference :participations, :updated_by, index: true, foreign_key: { to_table: :users }
    remove_reference :people, :updated_by, index: true, foreign_key: { to_table: :users }
    remove_reference :physical_components, :updated_by, index: true, foreign_key: { to_table: :users }
    remove_reference :places, :updated_by, index: true, foreign_key: { to_table: :users }
    remove_reference :value_lists, :updated_by, index: true, foreign_key: { to_table: :users }
    remove_reference :visual_contexts, :updated_by, index: true, foreign_key: { to_table: :users }
  end
end
