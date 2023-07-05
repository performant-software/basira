module Search
  module Base
    extend ActiveSupport::Concern

    class_methods do
      def search_attribute(*attrs, &block)
        @attrs ||= []

        if block.present?
          name, = attrs
          @attrs << { name: name, block: block }
        else
          name, options = attrs
          @attrs << { name: name }.merge(options || {})
        end
      end

      def search_attributes
        @attrs
      end
    end

    included do
      # Include the ID attribute as a string by default
      search_attribute(:id) do
        id.to_s
      end

      # Uses the specified attributes to create a JSON object
      def to_search_json
        hash = {}

        self.class.search_attributes.each do |attr|
          name = attr[:name]

          # Extract the value for the attribute
          if attr[:block].present?
            value = instance_eval(&attr[:block])
          elsif attr[:object].present? && attr[:group].present?
            value = extract_qualification(attr)
          else
            value = self.send(attr[:name])
          end

          # Skip the property of the value is empty
          next if value.nil?

          # Add the name/value pair to the JSON
          hash[name] = value

          # If the attribute should be included as a facet, include the "_facet" attribute
          hash["#{name}_facet".to_sym] = value if attr[:facet]
        end

        hash
      end

      private

      # Returns the qualification value for the passed attribute
      def extract_qualification(attr)
        object = attr[:object]
        group = attr[:group]
        form_field = attr[:form_field]
        multiple = attr[:multiple]

        value = qualifications.select do |qualification|
          include = true

          if qualification.value_list.object != object
            include = false
          end

          if qualification.value_list.group != group
            include = false
          end

          if form_field.present? && qualification.form_field != form_field
            include = false
          end

          include
        end

        return nil unless value.present?

        if multiple
          value.map{ |q| q.value_list.human_name }
        else
          value.first.value_list.human_name
        end
      end
    end
  end
end
