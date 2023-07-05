module Typesense
  module Helper

    def self.create_client
      Client.new(
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
    end

    def self.load_json(file)
      JSON.parse(File.read(file))
    end

  end
end
