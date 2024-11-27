module Search
  module Document
    extend ActiveSupport::Concern

    class_methods do
      def published
        preload = {
          **::Document.primary_attachment_preload,
          actions: {
            qualifications: :value_list
          },
          visual_context: {
            **::VisualContext.primary_attachment_preload,
            physical_component: {
              **::PhysicalComponent.primary_attachment_preload,
              artwork: {
                **::Artwork.primary_attachment_preload,
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
            },
            qualifications: :value_list
          },
          qualifications: :value_list
        }

        preload(preload)
          .joins(visual_context: { physical_component: :artwork })
          .where(artworks: { published: true })
      end
    end

    included do
      # Includes
      include Base

      # Search index attributes
      search_attribute :name
      search_attribute :notes
      search_attribute :document_format, object: 'Document', group: 'Document Format', facet: true
      search_attribute :document_type, object: 'Document', group: 'Document Type', multiple: true, facet: true
      search_attribute :orientation, object: 'Document', group: 'Orientation (spine)', multiple: true, facet: true
      search_attribute :size, object: 'Document', group: 'Size', facet: true
      search_attribute :aperture, object: 'Document', group: 'Aperture', facet: true
      search_attribute :binding_type, object: 'Document', group: 'Binding Type', multiple: true, facet: true
      search_attribute :binding_color, object: 'Document', group: 'Color', form_field: 'binding_color', multiple: true, facet: true
      search_attribute :number_sewing_supports, facet: true
      search_attribute :spine_features, object: 'Document', group: 'Spine Features', multiple: true, facet: true
      search_attribute :furniture, object: 'Document', group: 'Furniture', multiple: true, facet: true
      search_attribute :fastenings, object: 'Document', group: 'Fastenings', multiple: true, facet: true
      search_attribute :number_fastenings, facet: true
      search_attribute :location_fastenings, object: 'Document', group: 'Location of Fastenings', multiple: true, facet: true
      search_attribute :inscriptions_on_binding, facet: true
      search_attribute :inscription_text
      search_attribute :binding_ornamentation, object: 'Document', group: 'Binding Ornamentation', multiple: true, facet: true
      search_attribute :binding_iconography, object: 'Document', group: 'Iconography', form_field: 'binding_iconography', multiple: true, facet: true
      search_attribute :endband_present, facet: true
      search_attribute :endband_colors, object: 'Document', group: 'Color', form_field: 'endband_colors', multiple: true, facet: true
      search_attribute :endband_style, object: 'Document', group: 'Endband Style', multiple: true, facet: true
      search_attribute :binding_relationship, object: 'Document', group: 'Binding Relationship to Text Block', multiple: true, facet: true
      search_attribute :decorated_fore_edges, object: 'Document', group: 'Decorated Fore-Edges', multiple: true, facet: true
      search_attribute :uncut_fore_edges, facet: true
      search_attribute :fore_edges_color, object: 'Document', group: 'Color', form_field: 'fore_edges_color', multiple: true, facet: true
      search_attribute :fore_edge_text
      search_attribute :bookmarks_registers, facet: true
      search_attribute :bookmark_register_color, object: 'Document', group: 'Color', form_field: 'bookmark_register_color', multiple: true, facet: true
      search_attribute :bookmark_style, object: 'Document', group: 'Bookmark/Register Style', multiple: true, facet: true
      search_attribute :text_technology, object: 'Document', group: 'Text Technology', multiple: true, facet: true
      search_attribute :text_columns, facet: true
      search_attribute :page_contents, object: 'Document', group: 'Page Contents', multiple: true, facet: true
      search_attribute :ruling, facet: true
      search_attribute :ruling_color, object: 'Document', group: 'Color', form_field: 'ruling_color', multiple: true, facet: true
      search_attribute :rubrication, facet: true
      search_attribute :rubrication_color, object: 'Document', group: 'Color', form_field: 'rubrication_color', multiple: true, facet: true
      search_attribute :legibility, object: 'Document', group: 'Legibility', multiple: true, facet: true
      search_attribute :script, object: 'Document', group: 'Script', multiple: true, facet: true
      search_attribute :language, object: 'Document', group: 'Language', multiple: true, facet: true
      search_attribute :identity
      search_attribute :transcription
      search_attribute :transcription_expanded
      search_attribute :transcription_translation
      search_attribute :simulated_script, object: 'Document', group: 'Simulated Script', multiple: true, facet: true
      search_attribute :illumination_type, object: 'Document', group: 'Type of Illumination', multiple: true, facet: true
      search_attribute :illumination_iconography, object: 'Document', group: 'Iconography', form_field: 'illumination_iconography', multiple: true, facet: true

      search_attribute(:image_url) do
        primary_attachment&.file_url
      end

      search_attribute(:thumbnail_url) do
        primary_attachment&.thumbnail_url
      end

      search_attribute(:artwork) do
        visual_context&.physical_component&.artwork&.to_search_json
      end

      search_attribute(:actions) do
        actions.map{ |action| action.to_search_json }
      end

      search_attribute(:physical_component) do
        visual_context&.physical_component&.to_search_json
      end

      search_attribute(:visual_context) do
        visual_context&.to_search_json
      end
    end
  end
end
