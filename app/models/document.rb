class Document < ApplicationRecord
  # Includes
  include Attachable

  # Relationships
  belongs_to :visual_context
  has_many :qualifications, as: :qualifiable
  has_many :value_lists, through: :qualifications, as: :qualifiable

  # Resourceable parameters
  allow_params :visual_context_id, :name, :sewing_supports_visible, :number_sewing_supports, :number_fastenings,
               :location_of_fastenings, :inscriptions_on_binding, :inscription_text, :endband_present, :uncut_fore_edges,
               :fore_edge_text, :bookmarks_registers, :text_columns, :ruling, :rubrication, :identity, :transcription
end
