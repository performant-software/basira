class Action < ApplicationRecord
  # Includes
  include Qualifiable

  # Relationships
  belongs_to :document
end
