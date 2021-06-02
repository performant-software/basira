module AirtableImporter
  module Models
    class VisualContext < Base

      protected

      def columns
        [{
           attribute_name: :physical_component_id,
           airtable_name: '__ID_Artwork_fk',
           type: :foreign_key,
           related_class: ::PhysicalComponent
        }, {
           attribute_name: :name,
           airtable_name: '__ID_Artwork_fk',
           type: :custom,
           build_attributes: -> (airtable_id, artwork_id) do
             ::PhysicalComponent.find_by(airtable_id: artwork_id)&.name
           end
        }, {
           attribute_name: :attachments,
           airtable_name: 'Book & Holder Image',
           type: :foreign_keys,
           resolve: -> (airtable_id, image) do
             attachment = ::Attachment.find_or_initialize_by(airtable_id: attachment_airtable_id(image['id']), primary: true)
             attachment.file.attach(io: URI.open(image['url']), filename: image['filename']) unless attachment.file.attached?
             attachment
           end
        }, {
          attribute_name: :notes,
          airtable_name: 'Hold Info'
         }]
      end

      def model_class
        ::VisualContext
      end

      def query(app_id, api_key)
        Airrecord
          .table(api_key, app_id, 'Books')
          .all
      end
    end
  end
end
