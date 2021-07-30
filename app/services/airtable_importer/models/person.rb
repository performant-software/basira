module AirtableImporter
  module Models
    class Person < Base

      protected

      def columns
        [{
          attribute_name: :name,
          airtable_name: 'c_Artist FULLName'
         }, {
          attribute_name: :display_name,
          airtable_name: 'c_Artist FULLName'
         }, {
          attribute_name: :nationality,
          airtable_name: '_FK_Artist_Nationality'
         }, {
          attribute_name: :participations,
          airtable_name: 'Artworks',
          type: :foreign_keys,
          resolve: -> (airtable_id, artwork_airtable_id) do
            artwork = ::Artwork.find_by(airtable_id: artwork_airtable_id)
            person = ::Person.find_by(airtable_id: airtable_id)
            ::Participation.find_or_initialize_by(person: person, participateable: artwork)
          end
         }, {
           attribute_name: :artist_birth_date,
           airtable_name: 'Artist_Born'
         }, {
           attribute_name: :artist_death_date,
           airtable_name: 'Artist_Death_Date'
         }]
      end

      def model_class
        ::Person
      end

      def query(app_id, api_key)
        Airrecord
          .table(api_key, app_id, 'People')
          .all
      end

    end
  end
end
