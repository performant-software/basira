require 'optparse'

namespace :airtable do
  desc 'Synchronizes the data in Airtable with the database'
  task :import => :environment do
    # Validate parameters
    if ENV['AIRTABLE_APP_ID'].blank?
      puts 'The Airtable application ID is required'
      exit 0
    end

    if ENV['AIRTABLE_API_KEY'].blank?
      puts 'The Airtable API key is required'
      exit 0
    end

    importer = AirtableImporter::Importer.new(ENV['AIRTABLE_APP_ID'], ENV['AIRTABLE_API_KEY'])
    importer.import
  end
end
