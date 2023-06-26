class Api::BaseController < Api::ResourceController
  # Includes
  include DeviseTokenAuth::Concerns::SetUserByToken

  # Actions
  before_action :authenticate_user!, except: :show

  def destroy
    render json: { errors: I18n.t('errors.unauthorized') }, status: :unauthorized and return unless current_user.admin?

    super
  end

  protected

  def prepare_params
    # Set the created_by_id and updated_by_id attributes on create/update
    if params[:action].to_sym == :create
      params[param_name][:created_by_id] = current_user.id
      params[param_name][:updated_by_id] = current_user.id
    elsif params[:action].to_sym == :update
      params[param_name][:updated_by_id] = current_user.id
    end

    super
  end
end
