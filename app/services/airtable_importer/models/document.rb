module AirtableImporter
  module Models
    class Document < Base

      protected

      def columns
        [{
           attribute_name: :visual_context_id,
           airtable_name: '',
           type: :custom,
           build_attributes: -> (airtable_id, val = nil) do
             ::VisualContext.find_by(airtable_id: airtable_id)&.id
           end
        }, {
           attribute_name: :name,
           airtable_name: '',
           type: :custom,
           build_attributes: -> (airtable_id, val = nil) do
             ::VisualContext.find_by(airtable_id: airtable_id)&.name
           end
        }, {
           attribute_name: :attachments,
           airtable_name: 'Book Alone Image',
           type: :foreign_keys,
           resolve: -> (airtable_id, image) do
             attachment = ::Attachment.find_or_initialize_by(airtable_id: attachment_airtable_id(image['id']), primary: true)
             attachment.file.attach(io: URI.open(image['url']), filename: image['filename']) unless attachment.file.attached?
             attachment
           end
        }, {
          attribute_name: :notes,
          airtable_name: 'BookNotes'
         }, {
          attribute_name: :transcription,
          airtable_name: 'Text_transcribed'
         }]
      end

      def model_class
        ::Document
      end

      def query(app_id, api_key)
        Airrecord
          .table(api_key, app_id, 'Books')
          .all
      end
    end
  end
end
