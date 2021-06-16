module AirtableImporter
  class ModelFactory
    def self.get_model_classes
      [
        Models::Artwork,
        Models::PhysicalComponent,
        Models::ValueList,
        Models::VisualContext,
      ]
    end
  end
end
