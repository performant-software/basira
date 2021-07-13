module Api::Qualifiable
  extend ActiveSupport::Concern

  included do
    preloads qualifications: :value_list, only: :show
  end
end
