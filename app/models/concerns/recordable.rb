module Recordable
  extend ActiveSupport::Concern

  included do
    # Relationships
    belongs_to :create_user, class_name: 'User', foreign_key: :created_by_id, optional: true
    belongs_to :update_user, class_name: 'User', foreign_key: :updated_by_id, optional: true

    # Resourceable parameters
    allow_params :created_by_id, :updated_by_id
  end

end
