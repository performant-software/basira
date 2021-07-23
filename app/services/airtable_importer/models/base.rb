module AirtableImporter
  module Models
    class Base

      TRUE_VALUES = [true, 1, 't', 'true', 'y', 'yes']

      # Initializes the base class
      def initialize(app_id, api_key)
        @app_id = app_id
        @api_key = api_key

        @enums = {}
      end

      # Synchronizes the data with Airtable
      def synchronize
        # Call the hook to perform any pre-process functions
        pre_process

        # Timestamp all of the records that were previously imported
        find_existing
          .update_all(airtable_timestamp: DateTime.now)

        # Create/update records based on the Airtable data
        query(@app_id, @api_key).each do |record|
          model = find_or_initialize(record)

          begin
            model.update(build_attributes(record))
            log_errors(model) if model.errors.present?
          rescue StandardError => e
            puts e.inspect
          end
        end

        # Delete any records that were previously imported, but not included in the current import
        begin
          model_class
            .where.not(airtable_timestamp: nil)
            .destroy_all
        rescue StandardError => e
          puts e.inspect
        end

        # Call the hook to perform any post-process functions
        post_process
      end

      protected

      def attachment_airtable_id(airtable_id)
        "#{model_class.to_s}-#{airtable_id}"
      end

      def columns
      end

      def find_existing
        model_class.where.not(airtable_id: nil)
      end

      def find_or_initialize(record)
        model_class.find_or_initialize_by(airtable_id: record.id)
      end

      def find_related(record, column)
        airtable_id = record[column[:airtable_name]]
        related_class = column[:related_class]

        related_class.find_by(airtable_id: airtable_id)
      end

      def model_class
      end

      def post_process
      end

      def pre_process
      end

      def query(app_id, api_key)
      end

      private

      # Builds the attributes for the passed record
      def build_attributes(record)
        attributes = {
          airtable_timestamp: nil
        }

        columns.each do |column|
          attribute_name = column[:attribute_name]
          airtable_name = column[:airtable_name]
          transforms = column[:transforms]
          type = column[:type]

          case type
          when :boolean
            attributes[attribute_name] = TRUE_VALUES.include?(record[airtable_name])
          when :foreign_key
            related_record = find_related(record, column)
            attributes[attribute_name] = related_record.id unless related_record.nil?
          when :foreign_keys
            attributes[attribute_name] ||= []
            record[airtable_name]&.each do |foreign_key|
              related_record = column[:resolve].call(record.id, foreign_key)
              attributes[attribute_name] << related_record if related_record.present?
            end
          when :array
            attributes[attribute_name] = [record[airtable_name]]
          when :custom
            value = column[:build_attributes].call(record.id, record[airtable_name])
            attributes[attribute_name] = value unless value.nil?
          when :custom_array
            attributes[attribute_name] ||= []
            value = column[:build_attributes].call(record.id, record[airtable_name])
            attributes[attribute_name] << value unless value.nil?
          when :string_append
            if record[airtable_name].present?
              if attributes[attribute_name].nil?
                attributes[attribute_name] = ''
              else
                attributes[attribute_name] << "\n"
              end
              attributes[attribute_name] << record[airtable_name]
            end
          else
            attributes[attribute_name] = transform(transforms, record[airtable_name])
          end
        end

        attributes
      end

      def log_errors(model)
        puts "#{model_class.to_s} - #{model.errors.full_messages}"
        puts model.attributes
        puts ''
      end

      def transform(transforms, value)
        return value if value.nil?
        return value unless transforms.present?

        newValue = value

        transforms.each do |t|

          case t
          when :trim
            newValue = newValue.strip
          end

        end

        newValue
      end

    end
  end
end
