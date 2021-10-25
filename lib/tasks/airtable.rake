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

  desc 'Updates the description and repository_work_url columns on locations from Airtable'
  task :update_locations => :environment do
    # Validate parameters
    if ENV['AIRTABLE_APP_ID'].blank?
      puts 'The Airtable application ID is required'
      exit 0
    end

    if ENV['AIRTABLE_API_KEY'].blank?
      puts 'The Airtable API key is required'
      exit 0
    end

    records = Airrecord.table(ENV['AIRTABLE_API_KEY'], ENV['AIRTABLE_APP_ID'], 'Artworks').all

    records.each do |record|
      artwork = Artwork.find_by(airtable_id: record.id)
      next if artwork.nil?

      location = artwork.locations.first

      next if location.nil?

      description = nil
      repository_work_url = nil

      # Append the "Provenance" value to the existing description, if present
      if location.description.present? || record['Provenance'].present?
        description = [location.description, record['Provenance']]
                        .delete_if { |s| s.nil? || s.empty? }
                        .join("\n")
      end

      # Overwrite the existing repository_work_url
      if record['Hi_res_URL'].present?
        repository_work_url = record['Hi_res_URL']
      end

      location.update({
        description: description,
        repository_work_url: repository_work_url
      })
    end
  end
end
