class Api::BaseController < Api::ResourceController
  # Includes
  include DeviseTokenAuth::Concerns::SetUserByToken

  # Actions
  before_action :authenticate_user!, except: :show
  before_action :validate_delete_authorization, only: :destroy
  before_action :validate_update_authorization, only: :update

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

  private

  def is_owned?
    item = item_class.find(params[:id])
    item.created_by_id == current_user.id
  end

  def validate_delete_authorization
    render json: { errors: [I18n.t('errors.unauthorized')] }, status: :unauthorized unless current_user.admin? || is_owned?
  end

  def validate_update_authorization
    return if current_user.admin? || is_owned?

    unauthorized = false

    item_class.nested_attributes_options.keys.each do |key|
      nested_attributes = params[param_name][key]
      next unless nested_attributes.present?

      # Handle JSON and FormData parameters
      if nested_attributes.is_a?(Array)
        attrs = nested_attributes
      elsif nested_attributes.is_a?(ActionController::Parameters) && nested_attributes.keys.all?(&:is_integer?)
        attrs = nested_attributes.keys.map{ |index| nested_attributes[index] }
      end

      attrs.each do |attr|
        unauthorized = true if attr['_destroy'].to_s.to_bool
      end
    end

    render json: { errors: [{ base: I18n.t('errors.unauthorized') }] }, status: :unauthorized if unauthorized
  end
end
