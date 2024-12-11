class DocumentsSerializer < BaseSerializer
  # Includes
  include AttachableSerializer
  include NestableSerializer

  index_attributes :id, :name

  show_attributes :id, :name, :visual_context_id, :notes, :number_sewing_supports, :number_fastenings,
                  :inscriptions_on_binding, :inscription_text, :endband_present, :uncut_fore_edges, :fore_edge_text,
                  :bookmarks_registers, :text_columns, :ruling, :rubrication, :transcription, :transcription_expanded,
                  :transcription_translation, :identity, :created_at, :updated_at,
                  qualifications: QualificationsSerializer, actions: [:id, :document_id, :notes,
                  qualifications: QualificationsSerializer]

  show_attributes(:artwork_id) { |document| document.visual_context&.physical_component&.artwork_id }

  show_attributes(:visual_context_image) do |document|
    image = document.visual_context&.primary_attachment

    {
      file_url: image&.file_url,
      thumbnail_url: image&.thumbnail_url
    }
  end

  nested_attributes :id, :visual_context_id, :name, primary_attachment: [:id, :file_url, :primary, :thumbnail_url]
end
