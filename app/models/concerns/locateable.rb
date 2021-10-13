module Locateable
  extend ActiveSupport::Concern

  included do
    # Relationships
    has_many :locations, as: :locateable, dependent: :destroy

    # Nested attributes
    accepts_nested_attributes_for :locations, allow_destroy: true

    # Resourceable params
    allow_params locations_attributes: [:id, :place_id, :role, :subrole, :description, :certainty, :notes, :repository_work_url, :_destroy]
  end

end
