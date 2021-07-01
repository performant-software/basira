module AirtableImporter
  module Models
    class ValueList < Base

      protected

      def columns
        [{
          attribute_name: :object,
          airtable_name: 'Object',
          type: :multiselect_as_text,
        }, {
          attribute_name: :group,
          airtable_name: 'Group'
        }, {
          attribute_name: :human_name,
          airtable_name: 'Human name'
        }, {
          attribute_name: :authorized_vocabulary,
          airtable_name: 'Authorized vocabulary'
        }, {
          attribute_name: :url_database_value,
          airtable_name: 'URL/Database value (if applicable)'
        }, {
          attribute_name: :comment,
          airtable_name: 'Comment'
        }]
      end

      def model_class
        ::ValueList
      end

      def query(app_id, api_key)
        Airrecord
          .table(api_key, app_id, 'Value Lists')
          .all
      end
    end
  end
end
