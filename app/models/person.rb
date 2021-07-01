class Person < ApplicationRecord
  # Includes
  include Locateable

  # Relationships
  has_many :participations, dependent: :destroy
  has_many :qualifications, as: :qualifiable
  has_many :value_lists, through: :qualifications, as: :qualifiable

  # Nested attributes
  accepts_nested_attributes_for :participations, allow_destroy: :true

  # Resourceable parameters
  allow_params :name, :display_name, :person_type, :nationality, :authorized_vocabulary, :url, :database_value,
               :comment, :part_of, :same_as,
               participations_attributes: [:id, :participateable_id, :participateable_type,
                                           :role, :subrole, :description, :certainty, :notes, :_destroy],
                                           # Resourceable parameters
                                           allow_params :visual_context_id, :name, :sewing_supports_visible, :number_sewing_supports, :number_fastenings,
                                                        :location_of_fastenings, :inscriptions_on_binding, :inscription_text, :endband_present, :uncut_fore_edges,
                                                        :fore_edge_text, :bookmarks_registers, :text_columns, :ruling, :rubrication, :identity, :transcription, qualifications_attributes: [
                                                          :id,
                                                          :qualifiable_id,
                                                          :qualifiable_type,
                                                          :value_list_id,
                                                          :notes,
                                                          :persistent,
                                                          :_destroy
                                                        ]
end
