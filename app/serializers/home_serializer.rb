class HomeSerializer < BaseSerializer
  # Includes
  include AttachableSerializer

  index_attributes :id
end
