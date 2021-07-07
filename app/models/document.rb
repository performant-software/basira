class Document < ApplicationRecord
  # Includes
  include Attachable
  include Qualifiable

  # Callbacks
  after_create :set_actor_type

  # Relationships
  belongs_to :visual_context

  # Resourceable parameters
  allow_params :visual_context_id, :name, :sewing_supports_visible, :number_sewing_supports, :number_fastenings,
               :location_of_fastenings, :inscriptions_on_binding, :inscription_text, :endband_present, :uncut_fore_edges,
               :fore_edge_text, :bookmarks_registers, :text_columns, :ruling, :rubrication, :identity, :transcription
  private

  def set_actor_type
    value_list_id = ValueList.find_by(object: "Document", group: "Actor Type", human_name: "Document").id

    Qualification.find_or_create_by(qualifiable_type: "Document", qualifiable_id: self.id, value_list_id: value_list_id)
  end

end
