class Api::PeopleController < Api::BaseController
  # Search columns
  search_attributes :name, :display_name

  # Preloads
  preloads participations: [participateable: [Artwork.primary_attachment_preload, :primary_title]], only: :show
end
