# frozen_string_literal: true

class User < ApplicationRecord
  # Devise
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  # Includes
  include DeviseTokenAuth::Concerns::User

  # Resourceable parameters
  allow_params :name, :email, :password, :password_confirmation
end
