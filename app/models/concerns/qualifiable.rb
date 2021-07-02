module Qualifiable
  extend ActiveSupport::Concern

  included do
    # Relationships
    has_many :qualifications, as: :qualifiable, dependent: :destroy

    # Nested attributes
    accepts_nested_attributes_for :qualifications, allow_destroy: true

    # Resourceable attributes
    allow_params qualifications_attributes: [:id, :qualifiable_id, :qualifiable_type, :value_list_id, :notes,
                                             :persistent, :_destroy]
  end
end
