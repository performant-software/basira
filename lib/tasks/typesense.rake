namespace :typesense do
  desc "Index BASIRA documents into Typesense"
  task index: :environment do
    typesense = Typesense::Client.new(
      nodes: [
        {
          host: ENV.fetch('TYPESENSE_HOST') { 'localhost' },
          port: ENV.fetch('TYPESENSE_PORT') { 8108 },
          protocol: ENV.fetch('TYPESENSE_PROTOCOL') { 'http' }
        }
      ],
      api_key: ENV.fetch('TYPESENSE_API_KEY') { 'xyz' },
      num_retries: 10,
      healthcheck_interval_seconds: 1,
      retry_interval_seconds: 0.01,
      connection_timeout_seconds: 10,
      logger: Logger.new($stdout),
      log_level: Logger::INFO
    )

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
end
