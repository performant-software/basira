module AirtableImporter
  module Models
    class PhysicalComponent < Base

      def columns
        [{
           attribute_name: :artwork_id,
           airtable_name: '',
           type: :custom,
           build_attributes: -> (airtable_id, value) {
             ::Artwork.find_by(airtable_id: airtable_id).id
           }
        }, {
           attribute_name: :name,
           airtable_name: 'Title'
        }, {
           attribute_name: :attachments,
           airtable_name: 'Image',
           type: :foreign_keys,
           resolve: -> (airtable_id, image) do
             component_airtable_id = "#pc-#{image['id']}" # TODO: Comment me
             attachment = ::Attachment.find_or_initialize_by(airtable_id: component_airtable_id, primary: true)
             attachment.file.attach(io: URI.open(image['url']), filename: image['filename']) unless attachment.file.attached?
             attachment
           end
        }]
      end

      def model_class
        ::PhysicalComponent
      end

      def query(app_id, api_key)
        Airrecord
          .table(api_key, app_id, 'Artworks')
          .all
      end
    end
  end
end
