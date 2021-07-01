class ValueList < ApplicationRecord
  # Relationships
  has_many :qualifications
  has_many :qualifiables, through: :qualifications

  # Resource params
  allow_params :authorized_vocabulary, :comment, :object, :group, :human_name, :url_database_value

  def qualifiables
    qualifications.map {|x| x.qualifiable}
  end

  def qualifiables_count
    qualifiables.count
  end

end
