class Artwork < ApplicationRecord
  # Includes
  include Attachable
  include Indexable
  include Locateable
  include Participateable
  include Qualifiable
  include Recordable

  # Relationships
  has_many :artwork_titles, dependent: :destroy
  has_many :physical_components, dependent: :destroy
  has_many :documents
  has_one :primary_title, -> { where(primary: true) }, class_name: 'ArtworkTitle'
  belongs_to :created_by, class_name: 'User', optional: true
  belongs_to :updated_by, class_name: 'User', optional: true

  # Nested attributes
  accepts_nested_attributes_for :artwork_titles, allow_destroy: true

  attributes_to_index notes_external: :tesi, date_descriptor: :tesi, date_start: :tesi, date_end: :tesi, height: :tesi, width: :tesi,
                      depth: :tesi, accession_number: :isi, number_documents_visible: :isi, documents_count: :isi

  # Resourceable attributes
  allow_params :date_start, :date_end, :date_descriptor, :height, :width, :depth, :notes_external, :notes_internal,
               :published, :repository_work_url, :accession_number, :number_documents_visible, images: [],
                artwork_titles_attributes: [:id, :title, :notes, :primary, :_destroy,
                qualifications_attributes: [:id, :value_list_id, :notes, :persistent, :_destroy]]

  def to_solr
    artwork_solr = super

    artwork_titles = self.artwork_titles.map { |at| at.to_solr(true) }
    artwork_title_data = {
      artwork_titles_ssim: artwork_titles.map { |at| at['artwork_title_title'] }
    }
    artwork_titles_view = ingest_view(artwork_titles, 'Artwork Title')

    locations_view = ingest_view(self.locations.map { |loc| loc.to_solr(true) }, 'Location')

    people = self.participations.map do |ap|
      participation_solr = ap.to_solr(true)
      person_solr = ap.person.to_solr(true)

      participation_solr.merge(person_solr)
    end

    people_data = {
      people_names_ssim: people.map { |p| p['person_name'] },
      people_roles_ssim: people.map { |p| p['person_role'] },
      people_subroles_ssim: people.map { |p| p['person_subrole'] }
    }
    people_view = ingest_view(people, 'Person')

    places = self.locations.map(&:place).map { |place| place.to_solr(true)}
    place_data = {
      place_names_ssim: places.map { |p| p['place_name'] }
    }
    places_view = ingest_view(places, 'Place')

    if self.primary_attachment
      artwork_solr['artwork_img'] = self.primary_attachment.file_url
    end

    artwork_solr
      .merge(artwork_title_data)
      .merge({ artwork_titles_view_tesi: artwork_titles_view })
      .merge({ locations_view_tesi: locations_view })
      .merge(people_data)
      .merge({ people_view_tesi: people_view })
      .merge(place_data)
      .merge({ places_view_tesi: places_view })
  end
end
