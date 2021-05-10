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

            ::ArtworkTitle
              .joins(:artwork)
              .where(artworks: { airtable_id: airtable_id })
              .where(title: title)
              .where(primary: false)
              .first_or_create
          end
        }, {
          attribute_name: :date_descriptor,
          airtable_name: 'Date_Created'
        }, {
          attribute_name: :airtable_aws_url,
          airtable_name: 'AWS File Path'
        }, {
          attribute_name: :airtable_aws_filename,
          airtable_name: 'image_container_filename'
        }]
      end

      def model_class
        ::Artwork
      end

      def post_process
        ::Artwork
          .where.not(airtable_aws_url: nil)
          .each do |artwork|
            next if artwork.image.attached?

            begin
              artwork.image.attach(io: URI.open(artwork.airtable_aws_url), filename: artwork.airtable_aws_filename)
            rescue StandardError => e
              puts "Artwork ID: #{artwork.id}"
              puts e.inspect
            end
        end
      end

      def query(app_id, api_key)
        Airrecord
          .table(api_key, app_id, 'Artworks')
          .all
      end
    end
  end
end
