class ChangeValueListsCommentToText < ActiveRecord::Migration[6.0]
  def change
    change_column :value_lists, :comment, :text, using: 'comment::text'
  end
end
