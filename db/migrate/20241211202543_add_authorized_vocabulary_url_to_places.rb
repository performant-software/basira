class AddAuthorizedVocabularyUrlToPlaces < ActiveRecord::Migration[7.0]
  def change
    add_column :places, :authorized_vocabulary_url, :string
  end
end
