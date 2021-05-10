class Api::ArtworksController < Api::BaseController
  search_attributes 'artwork_titles.title'

  joins :primary_title, only: :index

  preloads :primary_title, only: :index
  preloads :artwork_titles, only: :show
  preloads Artwork.attachment_preloads
end
