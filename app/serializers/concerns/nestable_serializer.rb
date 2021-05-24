module NestableSerializer
  extend ActiveSupport::Concern

  included do
    def self.nested_attributes(*attrs, &block)
      @nested_attributes ||= []

      if attrs.present?
        if attrs.size == 1 && block.present?
          @nested_attributes << { attrs[0] => block }
        else
          @nested_attributes += attrs
        end
      end

      @nested_attributes
    end

    def render_nested(item)
      return {} if item.nil?

      serialized = {}

      # Set all of the base attributes
      self.class.nested_attributes&.map do |a|
        # TODO: Comment me
        if a.is_a?(Hash)
          children = a[:children]
          attributes = a.except(:children)
        else
          attributes = a
        end

        render_children serialized, item, children if children.present?
        extract_value serialized, item, attributes
      end

      serialized
    end

    private

    def render_children(serialized, item, attribute)
      relationship = attribute.keys.first
      serializer_class = attribute.values.first

      serializer = serializer_class.new(current_user)
      related_items = item.send(relationship)

      serialized[relationship] = []

      related_items.each do |related_item|
        serialized[relationship] << serializer.render_nested(related_item)
      end
    end
  end
end
