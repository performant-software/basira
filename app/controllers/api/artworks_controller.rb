class Api::ArtworksController < Api::BaseController
  # Search columns
  search_attributes 'artwork_titles.title'

  # Joins
  joins :primary_title, only: :index

  # Preloads
  preloads :primary_title, only: :index
  preloads Artwork.primary_attachment_preload, only: :index

  preloads :artwork_titles, only: :show
  preloads Artwork.attachments_preload, only: :show
end
