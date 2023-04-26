class Person < ApplicationRecord
  # Includes
  include Indexable
  include Locateable
  include Qualifiable
  include Recordable

  # Relationships
  has_many :participations, dependent: :destroy

  # Nested attributes
  accepts_nested_attributes_for :participations, allow_destroy: :true

  attributes_to_index display_name: nil, name: nil, person_type: nil, authorized_vocabulary: nil, database_value: nil, comment: nil, artist_birth_date: nil, artist_death_date: nil, years_active: nil

  # Resourceable parameters
  allow_params :name, :display_name, :person_type, :authorized_vocabulary, :url, :database_value, :comment, :part_of,
               :same_as, :artist_birth_date, :artist_death_date, :years_active,
               participations_attributes: [:id, :participateable_id, :participateable_type,
                                           :description, :certainty, :notes,
                                           :_destroy, qualifications_attributes: [:id, :value_list_id, :notes, :persistent, :_destroy]]
end
