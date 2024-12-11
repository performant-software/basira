class RemovePeopleAuthorizedVocabulary < ActiveRecord::Migration[7.0]
  def change
    remove_column :people, :authorized_vocabulary
  end
end
