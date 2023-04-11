module Participateable
  extend ActiveSupport::Concern

  included do
    # Relationships
    has_many :participations, as: :participateable, dependent: :destroy

    # Nested attributes
    accepts_nested_attributes_for :participations, allow_destroy: true

    # Resourceable params
    allow_params participations_attributes: [:id, :person_id, :description, :certainty, :notes,
    :_destroy, qualifications_attributes: [:id, :value_list_id, :notes, :persistent, :_destroy]]
  end
end
