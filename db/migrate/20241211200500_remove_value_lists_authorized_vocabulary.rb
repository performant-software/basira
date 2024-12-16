class RemoveValueListsAuthorizedVocabulary < ActiveRecord::Migration[7.0]
  def change
    remove_column :value_lists, :authorized_vocabulary
  end
end
