class ValueList < ApplicationRecord
  # Relationships
  has_many :selections
  has_many :selectables, through: :selections

  # Resource params
  allow_params :table, :column, :value, :authorized_vocabulary, :url_database_value, :comment

  def selectables
    selections.map {|x| x.selectable}
  end

end
