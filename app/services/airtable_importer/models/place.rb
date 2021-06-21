module AirtableImporter
  module Models
    class Place < Base

      protected

      # Country replacement values
      COUNTRIES = {
        'UK': 'United Kingdom',
        'USA': 'United States'
      }

      def columns
        [{
          attribute_name: :name,
          airtable_name: 'RepositoryName'
         }, {
          attribute_name: :city,
          airtable_name: 'RepositoryCity'
         }, {
          attribute_name: :country,
          airtable_name: 'RepositoryCountry',
          type: :custom,
          build_attributes: -> (airtable_id, country) do
            return nil if country.nil?
            COUNTRIES[country.strip&.to_sym] || country.strip
          end
         }]
      end

      def model_class
        ::Place
      end

      def query(app_id, api_key)
        Airrecord
          .table(api_key, app_id, 'Places')
          .all
      end

    end
  end
end
