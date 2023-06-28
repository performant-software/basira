class Api::UsersController < Api::BaseController
  # Search attributes
  search_attributes :name, :email

  protected

  def permitted_params
    parameters = super
    parameters << :admin if current_user.admin?
    parameters
  end
end
