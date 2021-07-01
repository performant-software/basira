module AirtableImporter
  class ModelFactory
    def self.get_model_classes
      [
        Models::Artwork,
        Models::PhysicalComponent,
        Models::VisualContext,
        Models::Document,
        Models::Person,
        Models::Place
      ]
    end
  end
end
