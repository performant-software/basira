module AirtableImporter
  class Importer
    def initialize(app_id, api_key)
      @app_id = app_id
      @api_key = api_key
    end

    def import
      ModelFactory.get_model_classes.each do |model_class|
        model = model_class.new(@app_id, @api_key)
        model.synchronize
      end
    end
  end
end
