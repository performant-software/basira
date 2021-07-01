class DocumentsSerializer < BaseSerializer
  # Includes
  include AttachableSerializer
  include NestableSerializer

  index_attributes :id, :name

  show_attributes :id, :name, :visual_context_id, :notes, :sewing_supports_visible, :number_sewing_supports,
                  :number_fastenings, :location_of_fastenings, :inscriptions_on_binding, :inscription_text,
                  :endband_present, :uncut_fore_edges, :fore_edge_text, :bookmarks_registers, :text_columns, :ruling,
                  :rubrication, :identity, :transcription, qualifications: QualificationsSerializer

  show_attributes(:artwork_id) { |document| document.visual_context&.physical_component&.artwork_id }

  nested_attributes :id, :visual_context_id, :name, primary_attachment: [:id, :file_url, :primary, :thumbnail_url]
end
