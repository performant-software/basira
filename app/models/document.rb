class Document < ApplicationRecord
  # Includes
  include Attachable
  include Qualifiable

  # Relationships
  belongs_to :visual_context
  has_many :actions, dependent: :destroy

  # Nested attributes
  accepts_nested_attributes_for :actions, allow_destroy: true

  # Resourceable parameters
  allow_params :visual_context_id, :name, :notes, :sewing_supports_visible, :number_sewing_supports, :number_fastenings,
               :location_of_fastenings, :inscriptions_on_binding, :inscription_text, :endband_present, :uncut_fore_edges,
               :fore_edge_text, :bookmarks_registers, :text_columns, :ruling, :rubrication, :identity, :transcription,
               actions_attributes: [:id, :notes, :_destroy, qualifications_attributes: [:id, :value_list_id, :notes, :persistent, :_destroy]]
end
