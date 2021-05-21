module AirtableImporter
  module Models
    class Artwork < Base

      protected

      def columns
        [{
           attribute_name: :artwork_titles,
           airtable_name: 'Title',
           type: :custom_array,
           build_attributes: -> (airtable_id, title) do
             return nil if title.nil? || title.empty?

             ::ArtworkTitle
               .joins(:artwork)
               .where(artworks: { airtable_id: airtable_id })
               .where(title: title)
               .where(primary: true)
               .first_or_create
           end
        }, {
          attribute_name: :artwork_titles,
          airtable_name: 'Title Alternate',
          type: :custom_array,
          build_attributes: -> (airtable_id, title) do
            return nil if title.nil? || title.empty?
            artwork = ::Artwork.find_by(airtable_id: airtable_id)
            ::ArtworkTitle.find_or_initialize_by(artwork: artwork, title: title, primary: false)
          end
        }, {
          attribute_name: :date_descriptor,
          airtable_name: 'Date_Created'
        }, {
          attribute_name: :attachments,
          airtable_name: 'Image',
          type: :foreign_keys,
          resolve: -> (airtable_id, image) do
            attachment = ::Attachment.find_or_initialize_by(airtable_id: image['id'], primary: true)
            attachment.file.attach(io: URI.open(image['url']), filename: image['filename']) unless attachment.file.attached?
            attachment
          end
        }, {
          attribute_name: :notes_external,
          airtable_name: 'Info'
         }]
      end

      def model_class
        ::Artwork
      end

      def query(app_id, api_key)
        Airrecord
          .table(api_key, app_id, 'Artworks')
          .all
      end
    end
  end
end
