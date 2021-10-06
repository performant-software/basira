class Document < ApplicationRecord
  # Includes
  include Attachable
  include Qualifiable

  # Relationships
  belongs_to :visual_context
  has_many :actions, dependent: :destroy

  # Nested attributes
  accepts_nested_attributes_for :actions, allow_destroy: true

  # Callbacks
  after_create :update_artwork_documents_count, :set_actor_type
  after_destroy :update_artwork_documents_count

  # Resourceable parameters
  allow_params :visual_context_id, :name, :notes, :sewing_supports_visible, :number_sewing_supports, :number_fastenings,
               :inscriptions_on_binding, :inscription_text, :endband_present, :uncut_fore_edges, :fore_edge_text,
               :bookmarks_registers, :text_columns, :ruling, :rubrication, :identity, :transcription,
               actions_attributes: [:id, :notes, :_destroy, qualifications_attributes: [:id, :value_list_id, :notes, :persistent, :_destroy]]

  private

  def set_actor_type
    value_list_id = ValueList.find_by(object: 'Document', group: 'Actor Type', human_name: 'Document').id

    Qualification.find_or_create_by(qualifiable_type: 'Document', qualifiable_id: self.id, value_list_id: value_list_id)
  end

  def update_artwork_documents_count
    documents_count = 0
    artwork = self.visual_context.physical_component.artwork
    artwork.physical_components.find_each do |pc|
      pc.visual_contexts.find_each do |vc|
        documents_count += vc.documents.count
      end
    end
    artwork.documents_count = documents_count
    artwork.save!
  end
end
