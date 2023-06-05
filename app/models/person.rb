class Person < ApplicationRecord
  # Includes
  include Locateable
  include Qualifiable
  include Recordable
  include Search::Person

  # Relationships
  has_many :participations, dependent: :destroy

  # Nested attributes
  accepts_nested_attributes_for :participations, allow_destroy: :true

  # Resourceable parameters
  allow_params :name, :display_name, :person_type, :authorized_vocabulary, :url, :database_value, :comment, :part_of,
               :same_as, :artist_birth_date, :artist_death_date, :years_active,
               participations_attributes: [:id, :participateable_id, :participateable_type,
                                           :description, :certainty, :notes,
                                           :_destroy, qualifications_attributes: [:id, :value_list_id, :notes, :persistent, :_destroy]]
end
