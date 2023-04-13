class Document < ApplicationRecord
  # Includes
  include Attachable
  include Indexable
  include Qualifiable
  include Recordable

  # Relationships
  belongs_to :visual_context
  belongs_to :artwork, counter_cache: true
  has_many :actions, dependent: :destroy

  attributes_to_index id: nil, name: :tesi, notes: :tesi, sewing_supports_visible: :bsi, number_sewing_supports: :isi, number_fastenings: :isi, inscriptions_on_binding: :bsi, inscription_text: :tesi, endband_present: :bsi, uncut_fore_edges: :bsi, fore_edge_text: :tesi, bookmarks_registers: :isi, text_columns: :isi, ruling: :tesi, rubrications: :isi, identity: :tesi, transcription: :tesi, transcription_expanded: :tesi, transcription_translation: :tesi

  # Nested attributes
  accepts_nested_attributes_for :actions, allow_destroy: true

  # Callbacks
  after_create :set_actor_type

  # Resourceable parameters
  allow_params :visual_context_id, :name, :notes, :sewing_supports_visible, :number_sewing_supports, :number_fastenings,
               :inscriptions_on_binding, :inscription_text, :endband_present, :uncut_fore_edges, :fore_edge_text,
               :bookmarks_registers, :text_columns, :ruling, :rubrication, :identity, :transcription, :transcription_expanded,
               :transcription_translation, :artwork_id, actions_attributes: [:id, :notes, :_destroy,
               qualifications_attributes: [:id, :value_list_id, :notes, :persistent, :_destroy]]

  def to_solr(value_list_fields, model_name)
    document_solr = super

    artwork_solr = self.artwork.to_solr(value_list_fields, 'Artwork')
    visual_context_solr = self.visual_context.to_solr(value_list_fields, 'Visual Context')

    action_data = {
      actions_tesim: self.actions.map { |a| a.to_solr(value_list_fields, 'Action') }.map{ |a| a['action_notes'] }.reject { |an| an.empty? }
    }

    # Remove the model prefix from the document id field
    document_solr['id'] = document_solr.delete 'document_id'

    if self.primary_attachment
      document_solr['document_img'] = self.primary_attachment.file_url
    end

    document_solr
      .merge(artwork_solr)
      .merge(action_data)
  end

  private

  def set_actor_type
    value_list_id = ValueList.find_by(object: 'Document', group: 'Actor Type', human_name: 'Document').id

    Qualification.find_or_create_by(qualifiable_type: 'Document', qualifiable_id: self.id, value_list_id: value_list_id)
  end
end
