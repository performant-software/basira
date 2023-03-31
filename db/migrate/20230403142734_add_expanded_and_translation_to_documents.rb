class AddExpandedAndTranslationToDocuments < ActiveRecord::Migration[6.0]
  def change
    add_column :documents, :transcription_expanded, :text
    add_column :documents, :transcription_translation, :text
  end
end
