class Api::BaseController < Api::ResourceController
  # Includes
  include DeviseTokenAuth::Concerns::SetUserByToken

  # Actions
  before_action :authenticate_user!
end