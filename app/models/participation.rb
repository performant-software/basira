class Participation < ApplicationRecord
  belongs_to :person
  belongs_to :participateable, polymorphic: true
end
