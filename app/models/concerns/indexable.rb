module Indexable
  extend ActiveSupport::Concern

  # For auto-detecting suffixes in value list fields
  SUFFIXES = {
    'String': "_ssi",
    'Integer': "_isi",
    'Float': "_fsi",
    'Boolean': "_bsi",
  }

  def to_solr(value_list_fields, model_name, omit_value_list_suffixes = false)
    model = self.class

    prefix = "#{self.class.name.underscore}_"

    unless model.attributes_to_index.empty?
      solr_obj = {}

      # Index the regular record attributes
      model.attributes_to_index.each do |key, suffix|
        if suffix
          solr_obj["#{prefix}#{key}_#{suffix}"] = self[key]
        else
          solr_obj["#{prefix}#{key}"] = self[key]
        end
      end

      # Check for value list records
      if model.method_defined? :qualifications
        value_list_items = self.qualifications.map { |q| q.value_list }
      else
        value_list_items = []
      end

      # Index value list attributes
      (value_list_fields[model_name] || []).each do |field_name|
        matching = value_list_items.find { |v| v[:group] == field_name }
        if matching
          value = matching.human_name

          if omit_value_list_suffixes
            suffix = ''
          else
            suffix = SUFFIXES[value.class.to_s.to_sym]
          end

          if suffix
            # Example key: visual_context_general_subject_genre_ssi
            solr_obj["#{prefix}#{field_name.downcase.gsub(/[^0-9a-z]/i, "_")}#{suffix}"] = value
          end
        end
      end

      solr_obj
    end
  end

  class << self
    def included(base)
      base.extend ClassMethods
    end
  end

  module ClassMethods
    def attributes_to_index(*attrs)
      @attributes_to_index ||= []
      @attributes_to_index += attrs
      @attributes_to_index[0]
    end
  end
end
