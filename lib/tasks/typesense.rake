require_relative '../typesense/helper'

namespace :typesense do
  desc 'Creates a new Typesense collection'
  task create: :environment do
    typesense = Typesense::Helper.create_client

    schema = Typesense::Helper.load_json('typesense/schema.json')
    typesense.collections.create(schema)
  end

  desc 'Deletes the Typesense collection'
  task delete: :environment do
    typesense = Typesense::Helper.create_client

    begin
      typesense.collections[ENV['TYPESENSE_COLLECTION_NAME']].delete
    rescue
      # Do nothing, collection doesn't exist yet
    end
  end

  desc 'Index BASIRA documents into Typesense'
  task index: :environment do
    typesense = Typesense::Helper.create_client

    preload = {
      **Document.primary_attachment_preload,
      actions: {
        qualifications: :value_list
      },
      visual_context: {
        **VisualContext.primary_attachment_preload,
        physical_component: {
          **PhysicalComponent.primary_attachment_preload
        },
        qualifications: :value_list
      },
      artwork: {
        **Artwork.primary_attachment_preload,
        artwork_titles: {
          qualifications: :value_list
        },
        participations: {
          qualifications: :value_list,
          person: {
            qualifications: :value_list
          }
        },
        locations: [:place, qualifications: :value_list],
        qualifications: :value_list
      },
      qualifications: :value_list
    }

    collection = typesense.collections[ENV['TYPESENSE_COLLECTION_NAME']]

    Document.preload(preload).find_each(batch_size: 500) do |document|
      collection.documents.upsert(document.to_search_json)
    end
  end

  desc 'Resets the Typesense collection and loads the data'
  task reset: :environment do
    [:delete, :create, :index].each do |task|
      Rake::Task["typesense:#{task.to_s}"].reenable
      Rake::Task["typesense:#{task.to_s}"].invoke
    end
  end
end
